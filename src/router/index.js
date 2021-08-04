import Vue from 'vue'
import VueRouter from 'vue-router'
import { getLocalstorage } from '@/utils/Localstorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const account = getLocalstorage('ACCOUNT')
  const hasAccount = !!account
  if (!hasAccount) {
    if (to.name === 'Login') {
      next()
    } else {
      next('/login')
    }
  } else if (to.name === 'Login' && hasAccount) {
    next('/')
  } else {
    next()
  }
})

export default router