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
import AdminBase from './page/admin/AdminBase.vue'
import AdminUser from './page/admin/AdminUser.vue'
import AdminThread from './page/admin/AdminThread.vue'
import session from './lib/session';

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
      path: '/thread/:id',
      component: Thread,
    },
    {
      path: '/setting',
      component: Setting,
      children: [
        {
          path: 'me',
          component: SettingMe,
        }, {
          path: 'security',
          component: SettingSecurity,
        },

      ]
    },
    {
      path: '/admin',
      component: AdminBase,
      children: [
        {
          path: 'user',
          component: AdminUser,
        },
        {
          path: 'thread',
          component: AdminThread,
        }
      ]
    },
  ]
const router = new VueRouter({
  mode: 'history',
  routes: routerConfig,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/admin") {
    if (session.isAdmin()) {
      next();
      next(false);
    }
  } else {
    next();
  }
});



new Vue({
  render: h => h(App),
  router,

}).$mount('#app')
