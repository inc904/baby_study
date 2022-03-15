
import login from './components/login.vue'
import register from './components/register.vue'
import newUser from './components/subComponents/newUser.vue'
import olderUser from './components/subComponents/olderUser.vue'

import VueRouter from 'vue-router'



var router  =  new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/register',
      component: register,
      children: [
        { path: 'newUser', component: newUser },
        { path: 'olderUser', component: olderUser },
      ]
    },
  ]
})
export default router