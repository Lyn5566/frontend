import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './page/Home.vue'
import Thread from './page/Thread.vue'
import Login from './page/Login.vue'
import Signup from './page/Signup.vue'
import Setting from './page/Setting.vue'
import SettingMe from './page/SettingMe.vue'
import SettingSecurity from './page/SettingSecurity.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
const routerConfig = 
[
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  }, 
  {
      path:'/thread/:id',
      component : Thread,
  },
  {
    path: '/setting',
    component: Setting,
    children:[
      {
        path:'me',
        component:SettingMe,
      },     {
        path:'security',
        component:SettingSecurity,
      },

    ]
  },

] 


new Vue({
  render: h => h(App),
  router: new VueRouter({
    mode : 'history',
    routes: routerConfig,
  })
}).$mount('#app')
