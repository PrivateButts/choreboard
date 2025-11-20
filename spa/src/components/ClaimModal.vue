<template>
  <div>
    <button class="btn" @click="modal.showModal()">Claim Bounty</button>
    <Teleport to="body">
      <dialog ref="modal" class="modal">
        <div class="modal-box">
          <form @submit.prevent>
            <legend>Claim Bounty</legend>
            <v-select label="name" :options="users" v-model="claimers" multiple></v-select>
          </form>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Nevermind</button>
              <button class="btn btn-primary" @click.prevent="submitClaim">Claim!</button>
            </form>
          </div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>

<script setup>
import 'vue-select/dist/vue-select.css';
import pb from '@/lib/pb'
import { sharedCache } from '@/lib/pb';
import { ref, onMounted, useTemplateRef } from 'vue';

const props = defineProps({
  bountyId: {
    type: String,
    required: true
  }
});

const users = ref([]);
const claimers = ref([]);
const modal = useTemplateRef('modal');

onMounted(async () => {
  users.value = sharedCache.get('users').map(user => {
    return { id: user.id, name: user.name };
  });
  claimers.value = [{ id: pb.authStore.record.id, name: pb.authStore.record.name }]
});

async function submitClaim() {
  try {
    const updatedBounty = await pb.collection('bounties').update(props.bountyId, {
      claimers: claimers.value.map(user => user.id),
      date_claimed: new Date().toISOString()
    });
    console.log('Bounty claimed:', updatedBounty);
    const claimModal = document.getElementById('claimModal');
    claimModal.close();
  } catch (error) {
    console.error('Error claiming bounty:', error);
  }
}
</script>

<style scoped>
:deep() {
  --vs-controls-color: #664cc3;
  --vs-border-color: #664cc3;

  --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #cc99cd;
  --vs-dropdown-option-color: #cc99cd;

  --vs-selected-bg: #664cc3;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #664cc3;
  --vs-dropdown-option--active-color: #eeeeee;
}
</style>
