<template>
  <div class="container">
    <h2>个人管理</h2>
    <div class="showBtn">
      <button @click="toggleForm">编辑</button>
    </div>
    <form @submit.prevent="createOrUpdate()" v-if="ui.formShow">
      <div class="input-control">
        <label>
          昵称
          <input type="text" v-model="form.nickname" @change="debounceValide('nickname')">
          <span class="error-list" v-for="(invalid,index) in errors.nickname" :key="index">
            <span class="error" v-if="invalid">{{rules.nickname[index].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          用户名
          <input type="text" v-model="form.username" @change="debounceValide('username')">
          <span class="error-list" v-for="(invalid,index) in errors.username" :key="index">
            <span class="error" v-if="invalid">{{rules.username[index].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          密码
          <input type="password" v-model="form.password" @change="debounceValide('password')">
          <span class="error-list" v-for="(invalid,index) in errors.password" :key="index">
            <span class="error" v-if="invalid">{{rules.password[index].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          签名
          <input type="text" v-model="form.intro">
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
        <th>密码</th>
        <th>签名</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.nickname}}</td>
          <td>{{it.username}}</td>
          <td>{{it.password}}</td>
          <td>{{it.intro}}</td>
          <td>
            <div class="btn-group">
              <button @click="fillAndShow(it)">更新</button>
              <button @click="remove(it.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :totalCount="totalCount" :limit="pageParams.limit" :onChange="turnPage"/>
  </div>
</template>


<script>

import admin from '../../mixin/admin'
export default {
    mixins :[admin],
    data(){
      return {
        model : 'user',
        rules: {
         username: {
          unique: {
            params: ['user', 'exists', 'username'],
            msg: "用户名已存在"
          },
          required: {
            msg: "用户名为必填项"
          },
          lengthBetween: {
            params: [4, 12],
            msg: "长度不能小于4且不能大于12位"
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: "用户名不合法"
          }
        },
        nickname: {
          // lengthBetween: {
          //   params: [4, 12],
          //   msg: "长度不能小于4且不能大于12位"
          // }
        },
        password: {
          required: {
            msg: "密码为必填项"
          },
          lengthBetween: {
            params: [6, 24],
            msg: "密码长度需在6位24位之间"
          },
          regex: {
            params: [/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/],
            msg: "密码必须包含字母和数字"
          }
        },
      },
      }
    },
}
</script>

<style scoped>
</style>
