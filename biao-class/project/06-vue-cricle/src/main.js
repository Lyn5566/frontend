import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './page/Home.vue'
import Login from './page/Login.vue'
import Signup from './page/Signup.vue'
import Setting from './page/Setting.vue'

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
    path: '/setting',
    component: Setting,
  },

] 


new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: routerConfig,
  })
}).$mount('#app')
