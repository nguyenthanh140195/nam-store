import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn, checkPermission } from '@/utils/auth'

import Layout1 from '@/components/Layout/LayoutHeader.vue'
import Layout2 from '@/components/Layout/LayoutFooter.vue'
import Home from '@/views/Home.vue'

const Login = () => import('@/views/Login.vue')
const About = () => import('@/views/About.vue')
const NotFound = () => import('@/views/NotFound.vue')

const ROLE = {
  AD: "ADMIN",
  US: "USER"
}

const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    component: Layout1,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { noAuth: true },
      },
      {
        path: "/profile",
        name: "Profile",
        meta: { roles: [ROLE.US, ROLE.AD] },
        component: () => import(/* webpackChunkName: "group" */ '@/views/Profile.vue'),
      },
    ]
  },
  {
    component: Layout2,
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { noAuth: true },
      },
    ]
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { noAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    meta: { noAuth: true },
  },
]

const router = createRouter({
  routes,
  mode: "history",
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  if (to.meta.noAuth) next();
  else if (!isLoggedIn()) next({ name: "Login", query: { redirectedFrom: to.name } });
  else if (!checkPermission(to.meta.roles, "ADMIN")) next(); // next({ path: "/no-permission", query: { redirectedFrom: to.name } });
  else next();
})

export default router
