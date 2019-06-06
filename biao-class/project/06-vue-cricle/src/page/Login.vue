<template>
<div>
  <div class="form-container">
    <h1>登录</h1>
    <form @submit.prevent="login">
      <div class="input-control">
        <label>
          <div class="filed">用户名</div>
          <input type="text" v-model="current.username">
          <span v-if="error.errUsername" class="error">{{error.errUsername}}</span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <div class="filed">密码</div>
          <input type="password" v-model="current.password">
          <span v-if="error.errPassword" class="error">{{error.errPassword}}</span>
        </label>
      </div>
           <div class="input-control">
          <span v-if="error.loginNoSuccess" class="error">{{error.msg}}</span>
      </div>
      <div class="input-control">
          <button type="submit">提交</button>
      </div>
    </form>
  </div>
</div>
</template>
<script>
import api from '../lib/api'
import session from '../lib/session'

export default {
  data() {
    return {
        current:{
          username:null,
          password:null,
        },
        //定义管理员登录用户名和密码
        admin :{
          username : 'admin',
          password : 'admin123'
        },
        error:{
            loginNoSuccess : false,
            msg:'用户名或密码不正确',
        },
    };
  },
  methods:{
    isAdmin(){
      let c = this.current;
      let admin = this.admin;
      if(c.username !== admin.username || c.password !== admin.password)
            return false;

           return true;
    },
      login(){
        if(this.isAdmin()){
          let user = {...this.current};
          user.IS_ADMIN = true;
          session.login(user,user.id,'/admin/user');
          return ;
        }
          let username = this.current.username;
          let password = this.current.password;
        if(!username || !password)
           return ;
        let param = {where :{and :{username,password}}};
        api('user/first',param)
        .then(r =>{
            let user = r.data;
            if(user){
                this.onLoginSuccess(user,user.id);
            }else{
                this.error.loginNoSuccess = true;
                return;
            }

        });
      },
      onLoginSuccess(user,id){
        session.login(user,id,"/");
      },
      validateCurrent(){
        let e = this.error;
        let username = this.current.username;
        let password = this.current.password;
        let invalidUsername  = !username || !/[a-zA-Z0-9]{4,12}/.test(username);
        let invalidPwd = !password || password.length<6;
       
        invalidUsername ? e.errUsername = '用户名必须是4-12位' : e.errUsername = null;

        invalidPwd ? e.errPassword = '密码长度不能小于6位' : e.errPassword = null;    
        
        return !e.errUsername && !e.errPassword;
      }
  },
};
</script>

<style scoped>

</style>