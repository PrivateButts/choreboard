<template>
  <NavBar />
  <main>
  </main>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow p-6 bg-base-200">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
const auth = useAuthStore()
</script>

<style scoped></style>
