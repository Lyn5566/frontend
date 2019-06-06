<template>
  <div class="container">
    <h2>个人管理</h2>
    <div class="showBtn">
      <button @click="ui.formShow = !ui.formShow">编辑</button>
    </div>
    <form @submit.prevent="createOrUpdate" v-if="ui.formShow">
      <div class="input-control">
        <label>
          昵称
          <input type="text" v-model="userForm.nickname">
          <div class="error" v-for="e in errors.name" :key="e.id">{{formRules.name[e].msg}}</div>
        </label>
      </div>
      <div class="input-control">
        <label>
          用户名
          <input type="text" v-model="userForm.username">
          <div class="error" v-for="e in errors.username" :key="e.id">{{formRules.username[e].msg}}</div>
        </label>
        
      </div>
      <!-- <div class="input-control">
        <label>
          密码
          <input type="text" v-model="userForm.password">
        </label>
      </div> -->
      <div class="input-control">
        <label>
          签名
          <input type="text" v-model="userForm.intro">
        </label>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>昵称</th>
        <th>用户名</th>
        <th>签名</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in userList" :key="it.id">
          <td>{{it.nickname}}</td>
          <td>{{it.username}}</td>
          <td>{{it.intro}}</td>
          <td>
            <div class="btn-group">
              <button @click="fill(it)">更新</button>
              <button @click="remove(it.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import api from "../../lib/api";
import valee from '../../lib/valee'
export default {
  data() {
    return {
      userForm: {},
      userList: [],
      ui: {
        formShow: true
      },
      formRules :{
        username :{
          unique :{
            params : ['user/exists'],
            msg :'用户名已存在',
          },
          betweenLength :{
            params : [4,12],
            msg : '长度不能小于4且不能大于12位',
           } ,           
          regx : 
          {
           params : [/[0-9a-zA-z]+/],
           msg : '用户名不合法',
          }
        },
        name :{
            required :{
              
              msg :'用户名不能为空',
          },
          betweenLength :{
            params : [4,12],
            msg : '长度不能小于4且不能大于12位',
           } , 
        },

      },
      errors :{
        //错误信息的key
        username :[
          'unique',
          'betweenLength',
          'regx',
          
        ],
        name :[
          'required',
          'betweenLength',
        ]
      },
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    //field => 'username' 'password' 相当于要验证的属性
    //key => 相当于betweenLength ,unique
      validate(field){
        //拿到所有的验证规则
        let rules = this.formRules[field];
        for(let key in rules){

          let rule = rules[key];
          //调用valee里对应的验证函数
          //相当于 valee.betweenLength('liuchenglei',4,12);
          // ...rule 相当于把一个数组展开 [1,2,3]=>(1,2,3)
          // valid 返回的是 true或者false
            let valid = valee[key](this.userForm[field],...rule);
            //拿到对应的错误对象
            let fieldObj = this.errors[field];
            //如果错误对象不存在，就初始化一个新对象
            if(!fieldObj)
            // Vue.set(obj, key, value);
            //this.$set(this.errors,field,{}) 相当于 this.errors.filed = {}
            fieldObj = this.$set(this.errors,field,{});
            //将对象中对应的验证规则设为valee返回的结果
            //如：field[betweenLength] = true ;
            fieldObj[key] = !valid;
        }

      },
    read() {
      api("user/read").then(r => {
        if (r.success) this.userList = r.data;
      });
    },
    hideForm(){
      this.ui.formShow = false;
      this.form = {};
    },
    showForm(){
      this.ui.formShow = true;
    },
    createOrUpdate() {
      let action = "user/create";
      if (this.userForm.id) action = "user/update";

      api(action, this.userForm).then(r => {
        if (r.success) this.resetForm();
        this.read();
      });
    },
    resetForm() {
      this.userForm = {};
    },
    remove(id) {
      if (!confirm("确实要删除吗")) return;
      api("user/delete", { id }).then(r => {
        if (r.success) this.read();
      });
    },
    fill(updateData) {
      this.userForm = updateData;
    }
  }
};
</script>

<style scoped>
</style>
