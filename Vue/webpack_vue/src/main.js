// import Vue from 'vue'
import Vue from '../node_modules/vue/dist/vue.js'
import './css/style.css'

import router from './router.js'


import VueRouter from 'vue-router'

Vue.use(VueRouter)
////////////
// 测试导出成员 
////////////

// import obj1, { name, age} from './js//exports.js'
import obj1, { title } from './js/exports.js'
console.log(obj1)
console.log(title)

// var login = {
// 	template: '<h1>这是页面文件形式的登陆组件</h1>'
// }
// 

import app from './app.vue'


var vm = new Vue({
  el: '#app',
  data: {
    msg: 123
  },
  render: function (createElements) {
    return createElements(app)
  },
  router
})