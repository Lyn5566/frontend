import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './page/Home.vue'
import Admin from './page/Admin.vue'
import AdminPost from './page/AdminPost.vue'


Vue.config.productionTip = false;
Vue.use(VueRouter);

const routeConfig = [
  {
    path:'/',
    component:Home,
  },
  {
    path:'/admin',
    component:Admin,
    children:[
      {
        path:'post/',
        component:AdminPost,
      }
    ]
  },  
];

new Vue({
  render: h => h(App),
   router : new VueRouter({
    routes:routeConfig,
  })
}).$mount('#app')
