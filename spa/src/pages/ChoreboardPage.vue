<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Choreboard</h1>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-for="day in 7" :key="day" class="text-center text-lg">
            <div>{{ new Date(getDateForDay(day)).toLocaleDateString('en-US', { weekday: 'long' }) }}</div>
            <div class="text-sm text-gray-600">{{ getDateForDay(day - 1) }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chore in chores" :key="chore.id">
          <td>{{ chore.name }}</td>
          <td v-for="day in 7" :key="day">
            <ChoreClaimBtn :chore="chore"
              :claims="chore.claims.filter(claim => claim.claimed.split(' ')[0] === getDateForDay(day - 1))"
              :date="getDateForDay(day - 1)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pb from '@/lib/pb'

const chores = ref([]);

onMounted(async () => {
  chores.value = await pb.collection('chores').getFullList({
    filter: '',
    expand: ['chore_claims_via_chore.user']
  });

  chores.value = chores.value.map(chore => {
    const claims = chore.expand.chore_claims_via_chore || [];
    return {
      ...chore,
      claims: claims
    };
  });

  pb.collection('chore_claims').subscribe('*', async function (e) {
    if (e.action === 'delete') {
      console.debug('Chore claim deleted', e.record.id);
      chores.value = chores.value.map(chore => {
        return {
          ...chore,
          claims: chore.claims.filter(claim => claim.id !== e.record.id)
        };
      });
    }
    else if (e.action === 'create') {
      console.debug('Chore claim created', e.record.id);
      const record = e.record;
      record.expand = { user: await pb.collection('users').getOne(record.user) };
      chores.value = chores.value.map(chore => {
        if (chore.id === e.record.chore) {
          return {
            ...chore,
            claims: [...chore.claims, record]
          };
        }
        return chore;
      });
    }
  }, { /* other options like expand, custom headers, etc. */ });
});

function getDateForDay(day) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);
  // Sunday of current week + day (0 => this week's Sunday, 7 => next week's Sunday)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + day);
  return startOfWeek.toISOString().split('T')[0];
}

</script>
