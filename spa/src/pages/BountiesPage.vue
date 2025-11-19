<template>
  <div class="container">
    <h1 class="text-3xl font-bold mb-6">Bounty Board</h1>
    <ul>
      <li v-for="bounty in bounties" :key="bounty.id">
        <BountyItem :bounty="bounty" />
      </li>
    </ul>
    <h2 class="text-2xl font-bold mt-12 mb-6">Completed Bounties</h2>
    <ul>
      <li v-for="bounty in completedBounties" :key="bounty.id">
        <BountyItem :bounty="bounty" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pb from '@/lib/pb'

const bounties = ref([]);
const completedBounties = ref([]);

onMounted(async () => {
  updateBounties();
});

async function updateBounties() {
  bounties.value = await pb.collection('bounties').getFullList({
    filter: 'date_claimed = ""',
    requestKey: 'bounties_unclaimed',
  });
  completedBounties.value = await pb.collection('bounties').getFullList({
    filter: 'date_claimed != ""',
    expand: ['claimers'],
    requestKey: 'bounties_completed',
  });
  console.debug('Fetched bounties:', bounties.value);
  console.debug('Fetched completed bounties:', completedBounties.value);
  completedBounties.value = completedBounties.value.map(bounty => {
    const claimers = bounty.expand.claimers
    return {
      ...bounty,
      claimers_label: claimers.map(c => c.name).join(', ')
    };
  });
}

pb.collection('bounties').subscribe('*', function (e) {
  console.debug('Bounties collection changed:', e);
  updateBounties();
});

</script>
