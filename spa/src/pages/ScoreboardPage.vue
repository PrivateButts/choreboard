<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Scoreboard</h1>
    <p v-for="user in users" :key="user.id">
      <span>{{ user.name }}</span>: <span>{{ user.score }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pb from '@/lib/pb'

const users = ref([]);

onMounted(async () => {
  fetchScores();
  pb.collection('chore_claims').subscribe('*', async function (e) {
    console.debug('Chore claim changed', e.action, e.record.id);
    await fetchScores();
  });
  pb.collection('bounties').subscribe('*', async function (e) {
    console.debug('Bounty changed', e.action, e.record.id);
    await fetchScores();
  });
});

async function fetchScores() {
  const userList = await pb.collection('users').getFullList();
  users.value = await Promise.all(userList.map(async (user) => {
    user.score = 0;
    const claims = await pb.collection('chore_claims').getFullList({
      filter: `user = "${user.id}"`,
      expand: "chore"
    });
    const bounties = await pb.collection('bounties').getFullList({
      filter: `claimers ~ "${user.id}"`
    });

    if (bounties.length > 0) {
      user.score += bounties.reduce((acc, bounty) => acc + bounty.value, 0);
    }
    if (claims.length > 0) {
      user.score += claims.reduce((acc, claim) => acc + claim.expand.chore.value, 0);
    }
    console.debug("User", user.email, "has score", user.score);
    return user;
  }));
}
</script>
