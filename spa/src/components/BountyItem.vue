<template>
  <div>
    <h2 class="text-xl font-bold">
      {{ bounty.name }}
      <span class="badge badge-xl badge-primary">{{ bounty.value }}</span>
    </h2>
    <p class="text-gray-500" v-if="bounty.date_claimed">Claimed By: {{ bounty.claimers_label }}</p>
    <ClaimModal :bounty-id="bounty.id" v-else />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ClaimModal from './ClaimModal.vue';

const props = defineProps({
  bounty: {
    type: Object,
    required: true
  }
});
</script>
