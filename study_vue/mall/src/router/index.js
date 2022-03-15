import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryList from '@/views/CategoryList'
import Goods from '@/views/Goods'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    component: () =>
      import(/* webpackChunkName: "categories" */ '@/views/Categories'),
  },
  {
    path: '/categoryList/:id',
    name: 'categoryList',
    component: CategoryList,
  },
  {
    path: '/goods/:id',
    name: 'goods',
    component: Goods,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
