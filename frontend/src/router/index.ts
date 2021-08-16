import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Files from '../views/Files.vue'
import Profile from '../views/Profile.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/public'
  },
  {
    path: '/public/:chapters*',
    name: 'public',
    component: Files,
  },
  {
    path: '/private/:chapters*',
    name: 'private',
    component: Files,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;