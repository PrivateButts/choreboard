<template>
  <div>
    <button :class="btnClasses" onclick="bountyModal.showModal()">
      <slot></slot>
    </button>
    <Teleport to="body">
      <dialog id="bountyModal" class="modal">
        <div class="modal-box">
          <form @submit.prevent>
            <legend>Create Bounty</legend>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Bounty Name</legend>
              <input type="text" class="input" placeholder="Type here" v-model="bountyName" required />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Bounty Value</legend>
              <input type="number" class="input" min="1" v-model="bountyValue" required />
              <p class="label">A good rule is 1 point per 15 minutes of effort.</p>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Description</legend>
              <textarea class="textarea h-24" placeholder="Additional info if needed"></textarea>
              <div class="label">Optional</div>
            </fieldset>

          </form>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Nevermind</button>
              <button class="btn btn-primary" @click.prevent="submitBounty">Issue Bounty!</button>
            </form>
          </div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>

<script setup>
import pb from '@/lib/pb'
import { ref, onMounted } from 'vue';

const props = defineProps({
  btnClasses: {
    type: String,
    default: 'btn'
  }
});

const bountyName = ref('');
const bountyValue = ref(1);
const description = ref('');

onMounted(async () => {
});

async function submitBounty() {
  if (!bountyName.value || bountyValue.value < 1) {
    alert('Please provide a valid bounty name and value.');
    return;
  }
  try {
    const createdBounty = await pb.collection('bounties').create({
      name: bountyName.value,
      value: bountyValue.value,
      issuer: pb.authStore.record.id,
      description: description.value
    });
    console.log('Bounty issued:', createdBounty);
    const bountyModal = document.getElementById('bountyModal');
    bountyModal.close();
  } catch (error) {
    console.error('Error issuing bounty:', error);
  }
}
</script>
