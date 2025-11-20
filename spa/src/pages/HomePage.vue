<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Scoreboard</h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
      <div v-for="user in users" :key="user.id" class="p-2">
        <ScoreBadge :user="user" />
      </div>
    </div>

    <ChoreboardPage />
    <BountiesPage />
    <AddFAB />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import pb from '@/lib/pb'
import ScoreBadge from '@/components/ScoreBadge.vue'
import ChoreboardPage from '@/pages/ChoreboardPage.vue'
import BountiesPage from '@/pages/BountiesPage.vue'
import AddFAB from '@/components/AddFAB.vue'

const users = ref([])

async function fetchUsers() {
  try {
    users.value = await pb.collection('users').getFullList({ sort: 'name' })
  } catch (e) {
    console.debug('Error fetching users', e)
    users.value = []
  }
}

onMounted(async () => {
  await fetchUsers()
  try {
    pb.collection('users').subscribe('*', async () => await fetchUsers())
  } catch (e) {
    console.debug('Realtime subscribe (users) failed', e)
  }
})
</script>
