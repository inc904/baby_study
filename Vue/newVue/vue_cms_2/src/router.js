// 路由模块
import VueRouter from 'vue-router'

import home from './components/tabbar_components/home.vue'
import search from './components/tabbar_components/search.vue'
import member from './components/tabbar_components/member.vue'
import shopcart from './components/tabbar_components/shopcart.vue'
import newsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import shareimg from './components/shareimg/shareimg.vue'


var router  =  new VueRouter({
  routes: [
   {path: '/', redirect: '/home'},
   {path: '/home', component: home},
   {path: '/search', component: search},
   {path: '/member', component: member},
   {path: '/shopcart', component: shopcart},
   {path: '/home/newsList', component: newsList},
   {path: '/home/newsList/newsInfo/:id', component: NewsInfo},
   {path: '/home/shareimg', component: shareimg},
  ],
  linkActiveClass: 'mui-active'
})
export default router