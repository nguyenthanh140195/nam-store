import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn, checkPermission, logout } from '@/utils/auth'

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
    path: '',
    name: "Header",
    component: Layout1,
    redirect: { name: "Home" },
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
      {
        path: "/profile",
        name: "Profile",
        meta: { requiresAuth: true, roles: [ROLE.US, ROLE.AD] },
        component: () => import(/* webpackChunkName: "group" */ '@/views/Profile.vue'),
      },
    ]
  },
  {
    path: '',
    name: "Footer",
    component: Layout2,
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/logout",
        name: "Logout",
        beforeEnter(to, from, next) {
          logout();
          next({ name: "Home" });
        }
      },
    ]
  },
  {
    path: "/about",
    name: "About",
    alias: '/help',
    component: About,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
]

const router = createRouter({
  routes,
  mode: "history",
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  // console.log(`[Router] beforeEach: ${from.name} - ${to.name}`);

  if (!to.meta.requiresAuth) next();
  else if (!isLoggedIn()) next({ name: "Login", query: { redirectedFrom: to.name } });
  // else if (!checkPermission(to.meta.roles, "ADMIN")) next({ path: "/no-permission", params: { redirectedFrom: to.name } });
  else next();
})

export default router
