<template>
  <div class="score-badge" role="status" :aria-busy="loading">
    <div class="score-left">
      <div class="score-icon">
        <img v-if="props.user && props.user.avatar" :src="avatarUrl" alt="avatar" class="score-avatar"
          :title="props.user.name" />
        <span v-else></span>
      </div>
      <div class="score-values">
        <div class="score-main">{{ fmt(lifetime.score) }}</div>
        <div class="score-sub">lifetime</div>
      </div>
    </div>

    <div class="score-divider" />

    <div class="score-right">
      <div class="score-week">{{ fmt(weekly.weekly_score) }}</div>
      <div class="score-week-sub">weekly</div>
      <!-- <div v-if="weekly.week_start" class="score-week-date">week of {{ new Date(weekly.week_start).toLocaleDateString()
      }}</div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import pb from '@/lib/pb'
import { useAuthStore } from '@/stores/auth'
import { getDateForDay } from '@/utils/date'

const props = defineProps({
  user: { type: Object, default: null }
})

const auth = useAuthStore()
const weekly = ref({ weekly_score: 0, week_start: null })
const lifetime = ref({ score: 0 })
const loading = ref(false)

const uid = computed(() => props.user?.id ?? auth.user?.id)

const avatarUrl = computed(() => {
  if (!props.user?.avatar) return null
  return `${pb.baseURL}/api/files/_pb_users_auth_/${props.user.id}/${props.user.avatar}`
})

let unsubWeekly = null
let unsubLifetime = null

async function fetchScores() {
  const uidVal = uid.value
  if (!uidVal) {
    weekly.value = { weekly_score: 0, week_start: null }
    lifetime.value = { score: 0 }
    return
  }

  const weekStart = getDateForDay(0) // Sunday

  loading.value = true
  try {
    // fetch latest weekly score for this user (sorted by week_start desc)
    const weeklyResp = await pb.collection('scores_weekly').getList(1, 1, {
      filter: `user_id = "${uidVal}"`,
      sort: '-week_start',
      requestKey: null
    })
    if (weeklyResp?.items?.length && weeklyResp.items[0].week_start === weekStart) {
      weekly.value = weeklyResp.items[0]
    } else {
      weekly.value = { weekly_score: 0, week_start: null }
    }

    // fetch lifetime score record for this user
    const lifetimeResp = await pb.collection('scores_lifetime').getList(1, 1, {
      filter: `id = "${uidVal}"`,
      requestKey: null
    })
    if (lifetimeResp?.items?.length) {
      lifetime.value = lifetimeResp.items[0]
    } else {
      lifetime.value = { score: 0 }
    }
  } catch (e) {
    console.debug('Error fetching scores', e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchScores()

  try {
    // `scores_weekly` and `scores_lifetime` are DB views and do not emit realtime events.
    // Subscribe to the underlying source tables instead and refresh when relevant changes occur.
    unsubWeekly = pb.collection('chore_claims').subscribe('*', async (e) => {
      const rec = e?.record
      if (!rec) return
      const uidVal = uid.value
      if (!uidVal) return
      // chore_claims have a `user` field (id) or a nested user object
      const recUserId = rec.user || rec.user?.id
      if (recUserId === uidVal) await fetchScores()
    })

    unsubLifetime = pb.collection('bounties').subscribe('*', async (e) => {
      const rec = e?.record
      if (!rec) return
      const uidVal = uid.value
      if (!uidVal) return
      // bounties may store claimers as an array of ids or as a JSON string
      const claimers = rec.claimers
      let includes = false
      if (Array.isArray(claimers)) includes = claimers.includes(uidVal)
      else if (typeof claimers === 'string' && claimers.includes(uidVal)) includes = true
      if (includes) await fetchScores()
    })
  } catch (e) {
    console.debug('Realtime subscribe failed', e)
  }
})

onUnmounted(() => {
  if (typeof unsubWeekly === 'function') unsubWeekly()
  if (typeof unsubLifetime === 'function') unsubLifetime()
})

watch(uid, () => fetchScores())

function fmt(n) {
  return Number(n || 0).toLocaleString()
}
</script>

<style scoped>
.score-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 6px 18px rgba(124, 58, 237, 0.18);
  font-family: inherit;
}

.score-left {
  display: flex;
  align-items: center;
  gap: 8px
}

.score-icon {
  font-size: 20px;
}

.score-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: cover;
}

.score-values {
  display: flex;
  flex-direction: column
}

.score-main {
  font-weight: 700;
  font-size: 1rem
}

.score-sub {
  font-size: 0.7rem;
  opacity: 0.9
}

.score-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px
}

.score-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end
}

.score-week {
  font-weight: 700
}

.score-week-sub {
  font-size: 0.7rem;
  opacity: 0.95
}

.score-week-date {
  font-size: 0.65rem;
  opacity: 0.85
}
</style>
