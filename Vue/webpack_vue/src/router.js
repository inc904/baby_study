import VueRouter from 'vue-router'

import account from './components/account.vue'
import goodlists from './components/goodlists.vue'

import login from './components/sub_components//login.vue'
import register from './components/sub_components//register.vue'

var router = new VueRouter({
  routes: [
    {
      path: '/account',
      component: account,
      children: [
        { path: 'login', component: login },
        { path: 'register', component: register }
      ]
    },
    { path: '/goodlists', component: goodlists }
  ]
})
export default router
