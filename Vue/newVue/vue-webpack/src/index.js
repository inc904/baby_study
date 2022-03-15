import '../src/css/index.css'
import '../src/css/index.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'

import router from './router.js'

console.log('hello111')

//  高级语法
class Person {
  static info = { name: 'zzc', age: 18 }
}
// var zzc = new Person()

console.log(Person.info)
// 传统方式定义组件
// var login = {
//   template:'<h1>这是传统方式注册的login组件</h1>'
// }

// 安装 路由 模块
Vue.use(VueRouter)

// .vue文件形式定义组件
import msgBasic from './msgBasic.vue'

// 组件引用
import App from './App.vue'




var vm = new Vue({
  el: '#app',
  data: {
    message: 'new begin'
  },
  components: {
    msgBasic
  },
  render(c) { return c(App) },
  router

})
