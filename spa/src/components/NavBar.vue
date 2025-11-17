<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">Choreboard</RouterLink>
    </div>
    <div class="flex-none">
      <!-- Account Menu -->
      <div class="dropdown dropdown-end" v-if="auth.user">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component"
              :src="`http://localhost:8080/api/files/_pb_users_auth_/${auth.user.id}/${auth.user.avatar}`" />
          </div>
        </div>
        <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><button @click="auth.logout" class="btn btn-link">Logout</button></li>
        </ul>
      </div>
      <!-- Login Button -->
      <div class="" v-else>
        <RouterLink to="/login" tabindex="0" role="button" class="btn btn-ghost">
          Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>
