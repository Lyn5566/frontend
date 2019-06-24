<template>
  <div class="container">
    <h2>分类管理</h2>
    <div class="showBtn">
      <button @click="toggleForm">编辑</button>
    </div>
    <form @submit.prevent="createOrUpdate()" v-if="ui.formShow">
      <div class="input-control">
        <label>
          标题
          <input type="text" v-model="form.name" @change="debounceValide('name')">
          <span class="error-list" v-for="(invalid,index) in errors.name" :key="index">
            <span class="error" v-if="invalid">{{rules.name[index].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>标题</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.name || '-'}}</td>
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
    mixins: [admin],
    methods: {
    },
    data(){
      return {
        model :"cat",
              rules: {
        name: {
          required: {
            msg: "此处为必填项"
          },
           unique: {
            params: ["cat", "exists", "name"],
            msg: "帖子名已存在"
          },
        },
      },
      }
    },
}
</script>

<style scoped>
</style>
