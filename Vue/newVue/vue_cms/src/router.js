// 路由模块
import VueRouter from 'vue-router'

import home from './components/tabbar_components/home.vue'
import search from './components/tabbar_components/search.vue'
import member from './components/tabbar_components/member.vue'
import shopcart from './components/tabbar_components/shopcart.vue'
import newsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import shareimg from './components/shareimg/shareimg.vue'
import imginfo from './components/shareimg/imginfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodinfo from './components/goods/goodinfo.vue'
import more from './components/goods/more.vue'


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
   {path: '/home/imginfo/:id', component: imginfo},
   {path: '/home/goodslist', component: goodslist},
   {path: '/home/goodslist/goodinfo/:id', component: goodinfo, name: 'goodinfo'},
   {path: '/home/goodslist/more/:id', component: more, name: 'moredesc'},
  ],
  linkActiveClass: 'mui-active'
})
export default router