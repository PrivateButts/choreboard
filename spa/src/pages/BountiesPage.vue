<template>
  <h1 class="text-3xl font-bold mb-6">Bounty Board</h1>
  <ul>
    <li v-for="bounty in bounties" :key="bounty.id">
      <h2 class="text-xl font-bold">{{ bounty.name }}</h2>
      <p class="text-gray-500">Reward: {{ bounty.value }}</p>
      <p class="text-gray-500">Issued: {{ bounty.created }}</p>

    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pb from '@/lib/pb'

const bounties = ref([]);
onMounted(async () => {
  updateBounties();
});

async function updateBounties() {
  bounties.value = await pb.collection('bounties').getFullList();
}

</script>
