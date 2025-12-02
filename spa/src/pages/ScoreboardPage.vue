<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Scoreboard</h1>
    <p v-for="user in users" :key="user.id">
      <span>{{ user.name }}</span>: <span>{{ user.score }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import pb from '@/lib/pb'

// Use the scores_lifetime view which aggregates scores server-side and is safe to read as a preview
const users = ref([]);
let unsub = null;

async function fetchScores() {
  try {
    const list = await pb.collection('scores_lifetime').getFullList({
      sort: '-score'
    });
    users.value = list.map(u => ({ id: u.id, name: u.name, score: u.score }));
  } catch (err) {
    console.debug('Failed to fetch scores_lifetime', err);
    users.value = [];
  }
}

onMounted(async () => {
  await fetchScores();
  try {
    unsub = pb.collection('scores_lifetime').subscribe('*', async (e) => {
      await fetchScores();
    });
  } catch (e) {
    console.debug('Realtime subscribe failed for scores_lifetime', e);
  }
});

onUnmounted(() => {
  if (typeof unsub === 'function') unsub();
});
</script>
