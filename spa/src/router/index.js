import { createRouter, createWebHistory } from 'vue-router'

import ChoreboardPage from '@/pages/ChoreboardPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import HomePage from '@/pages/HomePage.vue'
import BountiesPage from '@/pages/BountiesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/choreboard', component: ChoreboardPage },
    { path: '/bounties', component: BountiesPage },
    { path: '/login', component: LoginPage },
  ],
})

export default router
