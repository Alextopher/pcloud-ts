import * as VueRouter from 'vue-router'
import Files from '../views/Files.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/public/:chapters*',
    name: 'public',
    component: Files,
    breadcrumbs: route => ({breadcrumbs: route.map((_, i) => '/' + route.slice(0,i).join('/'))})
  },
  {
    path: '/private/:chapters*',
    name: 'private',
    component: Files,
    breadcrumbs: route => ({ breadcrumbs: route.map((_, i) => '/' + route.slice(0,i).join('/')) })
  },
  {
    path: '/profile',
    name: 'profile',
    component: About
  },
  {
    path: '/uploads',
    name: 'uploads',
    component: About
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes
})

export default router
