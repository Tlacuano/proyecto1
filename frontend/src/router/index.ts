import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',

    component: () => import('../modules/person/adapters/views/PeopleView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
