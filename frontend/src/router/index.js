import * as VueRouter from 'vue-router'

const Files = () => import('../views/Files.vue');
// const About = () => import('../views/About.vue');
const Profile = () => import('../views/Profile.vue');
const Login = () => import('../views/Login.vue');

const routes = [
  {
    path: '/',
    redirct: '/public'
  },
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
    component: Profile
  },
  {
    path: '/uploads',
    name: 'uploads',
    component: Login
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
