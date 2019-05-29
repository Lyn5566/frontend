<template>
    <div class="nav row">
      <div class="container">
        <div class="col col-12 left">
          <div class="col-8 logo">
            <router-link to="/"><img :src="logo" alt></router-link>
          </div>
          <div class="col-16 search">
            <input type="text">
          </div>
        </div>
        <div class="col-12 right text-right">
          <router-link to="/">首页</router-link>
          <div v-if="!session.isLogin()">
            <router-link to="/signup">注册</router-link>
            <router-link to="/login">登录</router-link>
          </div>
          <div v-else>
            <router-link to="/setting" id="loginName">{{session.userData().nickname}}</router-link>
            <a href="#" @click="session.logout()">登出</a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import logo from '../image/logo.png'
import session from '../lib/session'
export default {

  data(){
    return {
      logo,
      session,
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav{
    font-size: 90%; 
    border-bottom: solid 1px rgba(0 , 0, 0, .1);
    margin-bottom: 10px;   
}
.nav .logo{
    position: relative;
    width: 48px;
    top:0px;
}
.nav .text-right > *{
    display: inline-block;
 
}
.nav .right{
  
   text-align: right;
}
.nav a{

    line-height: 2;
    padding: 5px 10px;
}
.nav a:hover{
    color: rgba(0 , 0, 0, .2);
    
}

</style>
