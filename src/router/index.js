import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import(/* webpackChunkName: "about" */ '../views/Service.vue')
  },
  {
    path: '/my-team',
    name: 'MyTeam',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyTeam.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
