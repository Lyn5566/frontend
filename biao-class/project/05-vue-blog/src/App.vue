<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin/post">管理</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import './css/global.css'
export default {
  name: "app",
  components: {
    
  },
};
</script>
<style>
nav a {
  display: inline-block;
  padding: 5px;
}
</style>

