import '../src/css/index.css'
import '../src/css/index.scss'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

console.log('hello Vue')

import Vue from 'vue'

// 安装 路由 模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入并配置 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
axios.defaults.baseURL = 'http://120.77.181.41:3000/'

// 引入路由配置
import router from './router.js'
// 引入工具函数
import utils from './utils/utils.js'

// 第三方组件引用

// mui引用
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

// vant 组件库
import { Switch, Panel, Tab, Tabs, Tabbar, TabbarItem, Image, Lazyload, Card, Tag, Button, ImagePreview, NavBar } from 'vant'
import { Toast } from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Image).use(Lazyload).use(Card).use(Tag).use(Button).use(ImagePreview).use(Toast).use(NavBar).use(Panel).use(Switch)

// 组件引用
import App from './App.vue'
import Test from './test.vue'

import Vuex from 'vuex'
Vue.use(Vuex)
// 全局过滤器
Vue.filter('formatDate', utils.formatDate)
let car = JSON.parse(localStorage.getItem('car' ) ||' []')
//  "[{id: 87, count: 4, sell_price: 2200, selected: true }]")
const store = new Vuex.Store({
  state: {
    toBePaid: car
  },
  mutations: {
    addToCart(state, goodsinfo) {
      var flag = false
      state.toBePaid.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.toBePaid.push(goodsinfo)
      }
      // 同步更新本地存储
      localStorage.setItem('car', JSON.stringify(this.state.toBePaid))
    }
  },
  getters: {
    getAllCount(state) {
      let c = 0
      state.toBePaid.forEach(item => {
        c += item.count
      })
      return c
    }
  }
})

var vm = new Vue({
  el: '#app',
  data: {
    message: 'new begin'
  },
  components: {},
  render(c) { return c(App) },
  // render(c) { return c(Test) },
  router,
  store

})
