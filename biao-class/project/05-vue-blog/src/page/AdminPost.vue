<template>
  <div class="main container">
    <form @submit="onSubmit">
      <h2>添加/更新文章</h2>
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>内容</label>
        <textarea v-model="current.content"></textarea>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>id</th>
        <th>标题</th>
        <th>内容</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(it,index) in list" :key="index">
          <td>{{it.id}}</td>
          <td>{{it.title}}</td>
          <td :title="it.content">{{it.content | customFilter}}</td>
          <td>
            <button v-on:click="current = it">更新</button>
            <button v-on:click="remove(it.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import api from "../lib/api";
import "../css/admin.css";
export default {
  data() {
    return {
      current: {
      
      },
      list :[],
      
    };
  },
  methods: {
    onSubmit() {
      this.createOrupdate();
      },
    createOrupdate() {
    
        let action = this.current.id ? "update" : "create";
        
          api(`post/${action}`, this.current).then(r =>{
          if(r.success)
          
            this.read();
            this.resetForm();
          });
    },
    //删除
    remove(id){
      api('post/delete',{id})
      .then(r =>{
          if(r.success)
        this.read();
      });
    
    },
    //查找
    read(){
      api('post/read').then(r =>{
        if(r.success)
        this.list = r.data;
      })
    },
    resetForm() {
      this.current = {};
    }
  },
  mounted() {
    this.read();
  },
  filters:{
    customFilter(value){
      if(!value) return ' ';

      return value.length < 12 ? value : value.substring(0,12) + '...';
    }
  },
};
</script>
<style>
.main {
 max-width: 400px;
}
.main > *{
  margin-bottom: 1rem;
}


</style>
