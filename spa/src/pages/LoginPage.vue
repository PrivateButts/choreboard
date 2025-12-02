<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <div class="card w-full shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Login</h2>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="form-control w-full">
              <label class="label" for="email">
                <span class="label-text">Email</span>
              </label>
              <input id="email" type="email" v-model="email" required class="input input-bordered w-full"
                aria-label="Email" />
            </div>

            <div class="form-control w-full">
              <label class="label" for="password">
                <span class="label-text">Password</span>
              </label>
              <input id="password" type="password" v-model="password" required class="input input-bordered w-full"
                aria-label="Password" />
            </div>

            <div v-if="error" class="text-sm text-error">{{ error }}</div>

            <div class="card-actions justify-end">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">Signing in...</span>
                <span v-else>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="card w-full shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Scoreboard</h2>
          <div class="grid grid-cols-1 gap-2">
            <div v-for="user in users.slice(0, 6)" :key="user.id" class="p-1">
              <ScoreBadge :user="user" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import ScoreBadge from '@/components/ScoreBadge.vue';
import pb from '@/lib/pb';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const users = ref([]);
let unsub = null;

async function fetchScoresPreview() {
  try {
    const list = await pb.collection('scores_lifetime').getList(1, 10, { sort: '-score', expand: 'user_id' });
    console.debug('Fetched scores for login preview', list);
    users.value = list.items.map(u => {
      return u.expand.user_id;
    });
  } catch (err) {
    console.debug('Failed to fetch scores_lifetime for login preview', err);
    users.value = [];
  }
}

onMounted(async () => {
  await fetchScoresPreview();
  try {
    unsub = pb.collection('scores_lifetime').subscribe('*', async () => await fetchScoresPreview());
  } catch (e) {
    console.debug('Realtime subscribe failed for login preview', e);
  }
});

onUnmounted(() => {
  if (typeof unsub === 'function') unsub();
});

async function handleLogin() {
  error.value = '';
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    // redirect back if provided, else to home
    let redirect = route.query.redirect || route.query.redirectTo || '/';
    // Guard: don't redirect back to the login page (prevents nested ?redirect= chains)
    try {
      redirect = String(redirect);
      if (redirect.startsWith('/login')) redirect = '/';
    } catch (e) {
      redirect = '/';
    }
    await router.push(redirect);
  } catch (err) {
    console.debug('login error', err);
    error.value = err?.message || String(err) || 'Login failed';
  } finally {
    loading.value = false;
  }
}

</script>
