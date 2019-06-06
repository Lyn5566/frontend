<template>
  <div class="container">
    <div v-if="current.create_at">
          <h1>{{current.title}}</h1>
    <div class="info">
      <span>{{current.$user && current.$user.nickname}}</span>
      <span>{{current.create_at}}</span>
    </div>
    </div>
    <div v-else>
      加载中...
    </div>
    <div class="sub-thread">    
      <div v-for="(it,index) in subList" :key="index" class="sub-card">
        <div v-if="it.content">
        <div class="text">{{it.content}}</div>
        <div class="others">
          <span>{{it.$user && it.$user.nickname}}</span>
          <span>{{it.create_at}}</span>
        </div>
      </div>
      <div v-else>
        暂无跟帖
      </div>
    </div>
    </div>
    <form @submit.prevent="findSubThread">
      <textarea v-model="form.content"></textarea>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import api from "../lib/api";
import session from "../lib/session";
import dateformat from "../lib/dateformat";
export default {
  data() {
    return {
      subList: [],
      form: {},
      current: {},
      id: this.$route.params.id
    };
  },
  mounted() {
    this.find(this.id);
    this.readSubThread();
  },
  methods: {
    find(id) {
      api("thread/find", { id, with: "belongs_to:user" }).then(r => {
        this.current = r.data;
      });
    },
    findSubThread() {
      this.form.parent_id = this.id;
      this.form.user_id = session.userData().id;
      this.form.cat_id = 1;
      this.form.create_at = dateformat.format(new Date());
      api("thread/create", this.form).then(r => {
        if (r.success) this.form = {};
        this.readSubThread();
      });
    },
    readSubThread() {
      api("thread/read", {
        where: { and: { parent_id: this.id } },
        with: "belongs_to:user"
      }).then(r => {
        this.subList = r.data || [];
        console.log(r.data);
      });
    }
  }
};
</script>

<style scoped>
.info > * {
  margin-right: 10px;
}
.sub-card {
  background: #fff;

}
.sub-thread > *{
    margin:.5em 0;
}
.text {
  margin:15px 0;
}
.others > *{
  padding: 10px;
}
</style>
