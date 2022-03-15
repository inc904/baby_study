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
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'

// 引入路由配置
import router from './router.js'
import utils from './utils/utils.js'

// 第三方组件引用
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

// vant 组件库
import { Tab, Tabs, Tabbar, TabbarItem, Image, Lazyload } from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Image).use(Lazyload)

// 组件引用
import App from './App.vue'
import Test from './test.vue'

// 全局过滤器
Vue.filter('formatDate', utils.formatDate)

var vm = new Vue({
  el: '#app',
  data: {
    message: 'new begin'
  },
  components: {},
  render(c) { return c(App) },
  // render(c) { return c(Test) },
  router

})
