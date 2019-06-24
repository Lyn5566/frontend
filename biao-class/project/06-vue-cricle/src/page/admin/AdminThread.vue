<template>
  <div class="container">
    <h2>帖子管理</h2>
    <div class="showBtn">
      <button @click="toggleForm">编辑</button>
    </div>
    <form @submit.prevent="createOrUpdate()" v-if="ui.formShow">
      <div class="input-control">
        <label>
          标题
          <input type="text" v-model="form.title" @change="debounceValide('title')">
          <span class="error-list" v-for="(invalid,index) in errors.title" :key="index">
            <span class="error" v-if="invalid">{{rules.title[index].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          内容
          <textarea type="text" v-model="form.content" @change="debounceValide('content')"></textarea>
          <span class="error-list" v-for="(invalid,index) in errors.content" :key="index">
            <span class="error" v-if="invalid">{{rules.content[index].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <div class="cat_id">
            分类
            <Dropdown
              :list="catList"
              searchBy="name"
              displayBy="name"
              :onSelect="onCatSelect"
              @blur="validate('cat_id')"
            />
            <span class="error-list" v-for="(invalid,index) in errors.cat_id" :key="index">
              <span class="error" v-if="invalid">{{rules.cat_id[index].msg}}</span>
            </span>
          </div>
        </label>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>标题</th>
        <th>内容</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.title || '-'}}</td>
          <td>{{it.content || '-'}}</td>
          <td>
            <div class="btn-group">
              <button @click="fill(it)">更新</button>
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
import admin from "../../mixin/admin";
import Dropdown from "../../component/Dropdown";
import api from "../../lib/api";
import dateformat from '../../lib/dateformat'
import session from '../../lib/session';
export default {
  mixins: [admin],
  components: {
    Dropdown
  },
  methods: {
    readCat() {
      api("cat/read").then(r => {
        this.catList = r.data;
      });
    },
    beforeCreateOrUpdate() {
        this.form.create_at = dateformat.format(new Date);
        this.form.user_id = session.userData.id || 0;
    },
    onCatSelect(it) {
      this.form.cat_id = it ? it.id : it;
      this.validate("cat_id");
      console.log(it);
    }
  },
  mounted() {
    this.readCat();
  },
  data() {
    return {
      model: "thread",
      catList: [],
      rules: {
        title: {
          required: {
            msg: "标题为必填项"
          },
          lengthBetween: {
            params: [0, 20],
            msg: "长度不能大于20位"
          }
        },
        cat_id: {
          required: {
            msg: "此项为必填项"
          }
        },
        content: {}
        // password: {
        //   required: {
        //     msg: "密码为必填项"
        //   },
        //   lengthBetween: {
        //     params: [6, 24],
        //     msg: "密码长度需在6位24位之间"
        //   },
        //   regex: {
        //     params: [/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/],
        //     msg: "密码必须包含字母和数字"
        //   }
        // }
      }
    };
  }
};
</script>

<style scoped>
</style>
