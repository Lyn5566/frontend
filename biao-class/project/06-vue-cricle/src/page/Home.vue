<template>
  <div class="container">
    <h1>Home</h1>
    <form class="new-thread" @submit.prevent="threadSubmit" :disabled="changePending">
      <input type="text" v-model="threadForm.title">
      <div class="error" v-if="error.title">帖子标题不能为空</div>
      <textarea v-model="threadForm.content"></textarea>
      <button type="submit">提交</button>
    </form>
    <div class="timeline">
      <div class="thread-list" v-for="(it,index) in formList" :key="index">
        <router-link :to="'/thread/'+ it.id">
        <div class="title">
          <h2>{{it.title}}</h2>
        </div>
        </router-link>
        <div class="content">{{it.content}}</div>
        <div class="others small">
        <span class="name"><strong>{{it.$user ? (it.$user.nickname || it.$user.username) : '已注销'}}</strong></span>
        <span class="create-time">{{it.create_at}}</span>
        </div>
        <div class="row" v-if="user && it.$user && (it.$user.id === user.id)">
          <div class="tool">
            <span class="btn-group">
              <button @click="threadForm = it">编辑</button>
              <button @click="threadDelete(it.id)">删除</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import dateformat from "../lib/dateformat";
import session from "../lib/session";
export default {
  data() {
    return {
      threadForm: {},
      formList: [],
      error: {
        title: false,
        content: false
      },
      user: session.userData(),
      changePending: false
    };
  },
  mounted() {
    this.threadRead();
  },
  methods: {
    threadSubmit() {
      if(!session.isLogin){

        alert('请登录后执行')
        return ;
      }

      let form = this.threadForm;
      if (!form.title) {
        this.error.title = true;
        return;
      }
      this.changePending = true;
      let url = null;

      if (form.id && form.$user.id === this.user.id) {
        url = "thread/update";
      } else {
        url = "thread/create";
      }

      form.cat_id = 1;
      form.user_id = this.user.id;
      form.create_at = dateformat.format(new Date());
      api(url, form).then(r => {
        if (!r.success) return;

        this.changePending = false;
        this.threadForm = {};
        this.threadRead();
      });
    },
    threadRead() {
      api("thread/read", { with: ["belongs_to:user", "belongs_to:cat"] })
      .then(r => {
          if (r.success) this.formList = r.data;
          // console.log(r.data);
        }
      );
    },
    threadDelete(id) {
      api("thread/delete", { id })
      .then(r => {
        if (r.success) {
          if (!confirm("确实要删除吗")) return;

          this.threadRead();
          alert("删除成功");
        }
      });
    }
  }
};
</script>

<style scoped>
.thread-list {
  border: 2px solid;
  margin: 10px 0;
  padding: 10px;
  position: relative;
}
.tool {
  border: solid 2px;
  position: absolute;
  top: 22px;
  right: 12px;
}
form .error{
  color: #f10;
}
.others > *{
  margin-right: 1em;
}
.thread-list > *{
    margin: .5em 0;
}
.small {
  font-size: 80%;
}
</style>

