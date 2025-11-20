<template>
  <div>
    <button :class="btnClasses" @click="choreModal.showModal()">
      <slot></slot>
    </button>
    <Teleport to="body">
      <dialog ref="choreModal" class="modal">
        <div class="modal-box">
          <form @submit.prevent>
            <legend>Create Chore</legend>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Chore Name</legend>
              <input type="text" class="input" placeholder="Type here" v-model="choreName" required />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Chore Value</legend>
              <input type="number" class="input" min="1" v-model="choreValue" required />
              <p class="label">A good rule is 1 point per 15 minutes of effort.</p>
            </fieldset>
          </form>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Nevermind</button>
              <button class="btn btn-primary" @click.prevent="submitChore">Create Chore</button>
            </form>
          </div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>

<script setup>
import pb from '@/lib/pb'
import { ref, onMounted, useTemplateRef } from 'vue';

const props = defineProps({
  btnClasses: {
    type: String,
    default: 'btn'
  }
});

const choreName = ref('');
const choreValue = ref(1);
const choreModal = useTemplateRef('choreModal');

onMounted(async () => {
});

async function submitChore() {
  if (!choreName.value || choreValue.value < 1) {
    alert('Please provide a valid chore name and value.');
    return;
  }
  try {
    const createdChore = await pb.collection('chores').create({
      name: choreName.value,
      value: choreValue.value,
    });
    console.log('Chore created:', createdChore);
    choreModal.value.close();
  } catch (error) {
    console.error('Error creating chore:', error);
  }
}
</script>
