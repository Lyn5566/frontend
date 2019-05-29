<template>
  <div class="container">
    <h1>{{current.title}}</h1>
    <div class="info">
      <span>{{current.$user && current.$user.nickname}}</span>
      <span>{{current.create_at}}</span>
    </div>
    <div class="sub-thread">
      <div v-for="(it,index) in subList" :key="index" class="sub-card">
        <div>{{it.content}}</div>
        <div class="others">
          <span>{{it.$user.nickname}}</span>
          <span>{{it.create_at}}</span>
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
      });
    },
    readSubThread() {
      api("thread/read", {
        where: { and: { parent_id: this.id } },
        with: "belongs_to:user"
      }).then(r => {
        this.subList = r.data;
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

</style>
