import * as VueRouter from 'vue-router'
import Files from '../views/Files.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    redirect: '/public'
  },
  {
    path: '/:chapters+',
    name: 'public',
    component: Files
  },
  {
    path: '/private/*',
    name: 'private',
    component: Files
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
