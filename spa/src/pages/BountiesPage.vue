<template>
  <h1 class="text-3xl font-bold mb-6">Bounty Board</h1>
  <ul>
    <li v-for="bounty in bounties" :key="bounty.id">
      <h2 class="text-xl font-bold">{{ bounty.name }}</h2>
      <p class="text-gray-500">Reward: {{ bounty.value }}</p>
      <p class="text-gray-500">Issued: {{ bounty.created }}</p>
      <ClaimModal :bounty-id="bounty.id" />
    </li>
  </ul>
  <h2 class="text-2xl font-bold mt-12 mb-6">Completed Bounties</h2>
  <ul>
    <li v-for="bounty in completedBounties" :key="bounty.id">
      <BountyItem :bounty="bounty" />
    </li>
  </ul>
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
    filter: 'date_claimed = ""'
  });
  completedBounties.value = await pb.collection('bounties').getFullList({
    filter: 'date_claimed < @now',
    expand: ['claimers']
  });
  completedBounties.value = completedBounties.value.map(bounty => {
    const claimers = bounty.expand.claimers
    return {
      ...bounty,
      claimers_label: claimers.map(c => c.name).join(', ')
    };
  });
}

</script>
