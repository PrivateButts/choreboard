<template>
  <div class="flex justify-center">
    <button class="btn btn-soft btn-xl w-full" @click="toggleClaim()">
      <div class="avatar p-2 h-full" v-for="claim in claims" :key="claim.id">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component"
            :src="`http://localhost:8080/api/files/_pb_users_auth_/${claim.expand.user.id}/${claim.expand.user.avatar}`" />
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import pb from '@/lib/pb';

const props = defineProps({
  chore: Object,
  claims: Array,
  date: String
});

function toggleClaim() {
  const router = useRouter();
  const route = useRoute();
  const auth = useAuthStore();

  if (!auth.is_logged_in) {
    // redirect to login with return path
    router.push({ path: '/login', query: { redirect: route.fullPath } });
    return;
  }

  const existingClaim = props.claims.find(claim => claim.expand.user.id === pb.authStore.record.id);
  if (existingClaim) {
    // Remove claim
    pb.collection('chore_claims').delete(existingClaim.id).then(() => {
      console.debug('Claim removed');
    });
  } else {
    // Add claim
    pb.collection('chore_claims').create({
      chore: props.chore.id,
      user: pb.authStore.record.id,
      claimed: props.date + ' 00:00:00'
    }).then(() => {
      console.debug('Claim added');
    });
  }
}
</script>
<style scoped></style>
