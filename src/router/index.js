import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const isLoggedIn = () => {
  return true;
}

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { noAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    meta: { noAuth: true },
    component: () => import('../views/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    meta: { noAuth: true },
    component: () => import('../views/Home.vue')
  },
]

const router = createRouter({
  routes,
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  if (to.meta.noAuth || isLoggedIn()) next()
  else next({ name: 'Login', query: { redirect: to.name } })
})

export default router
