<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="title">
          设置基础信息
          <button @click="edit"><span v-if="editmode">取消</span>编辑</button>
        </div>
        
          <form @submit.prevent="updateForm">
            <fieldset :disabled="updatePending">
              <dl>
                <dt>用户名</dt>
                <dd>
                  <input class="field" type="text" v-model="myInfo.username" :readonly="!editmode">
                  <div class="error" v-if="error.usernameIsExist">用户名已存在</div>
                </dd>
              </dl>
              <dl>
                <dt>昵称</dt>
                <dd>
                  <input class="field" type="text" v-model="myInfo.nickname" :readonly="!editmode">
                </dd>
              </dl>
              <dl>
                <dt>自我介绍</dt>
                <dd>
                  <!-- <input class="field" type="text" v-model="myInfo.text" :readonly="!editmode"> -->
                  <textarea class="field" type="text" v-model="myInfo.text" :readonly="!editmode"></textarea>
                </dd>
              </dl>
              <button type="submit" v-if="editmode">提交</button>
            </fieldset>
          </form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import store from "../lib/store";
export default {
  data() {
    return {
      myInfo: {},
      meSaved:{},
      editmode: false,
      updatePending: false,
      error:{
        usernameIsExist:false,
      },
    };
  },
  mounted() {
    api("user/find", { id: store.get('user').id }).then(r => {
      let data = r.data;
      this.meSaved = r.data;
      this.myInfo ={...data};

    });
  },
  methods: {
    edit() {
      this.editmode = !this.editmode;
    },
    updateForm() {
      this.updatePending = true;
      //检查用户名是否存在
      api('user/exists',{where:{and:{username:this.myInfo.username}}})
      .then(r =>{

          let userChange = this.meSaved.username !== this.myInfo.username;
          if(r.data && userChange){
            this.error.usernameIsExist= true;
            this.updatePending = false;
            return ;
          }
          this.error.usernameIsExist= false;

        api("user/update", this.myInfo)
        .then(r => {
          this.myInfo = r.data;
          this.updatePending = false;
          this.editmode = false;
        });
      })
    }
  }
};
</script>

<style scoped>
form input {
  width: auto;
}
</style>
