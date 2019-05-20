<template>
<div>
  <div class="form-container">
    <h1>注册</h1>
    <form @submit.prevent="signup">
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
        <label>
          <div class="filed">再次输入密码</div>
          <input type="password" v-model="current.repassword">
          <span v-if="error.errRepassword" class="error">{{error.errRepassword}}</span>
        </label>
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
export default {
  data() {
    return {
        current:{
          username:null,
          password:null,
          repassword:null,
        },
        error:{
          errUsername:null,
          errPassword:null,
          errRepassword:null,
        }
    };
  },
  methods:{
      signup(){
        if(!this.validateCurrent())
        return ;

        api('user/create',this.current)
          .then(r =>{
            if(r.success)
            alert('注册成功');
            this.$router.push({path:'/login'});
          })
      },
      validateCurrent(){
        let e = this.error;
        let username = this.current.username;
        let password = this.current.password;
        let repassword = this.current.repassword;
        let invalidUsername  = !username || !/[a-zA-Z0-9]{4,12}/.test(username);
        let invalidPwd = !password || password.length<6;
        let invalidRepwd = !repassword || repassword.length < 6 
        let invalidRepwd2= !repassword || repassword!==password;

        invalidUsername ? e.errUsername = '用户名必须是4-12位':e.errUsername = null;

        invalidPwd ? e.errPassword = '密码长度不能小于6位' : e.errPassword = null;
        invalidRepwd ? e.errPassword = '密码长度不能小于6位' : e.errPassword = null;
        invalidRepwd2 ? e.errRepassword='两次密码输入不一致':e.errRepassword = null;
        
        return !e.errUsername && !e.errPassword && !e.errRepassword;
      }
  },
};
</script>

<style>

</style>
