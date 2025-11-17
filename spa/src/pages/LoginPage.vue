<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-6">
    <div class="card w-full max-w-md shadow-xl">
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

          <div class="card-actions justify-end">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

function handleLogin() {
  authStore.login(email.value, password.value);
}

</script>
