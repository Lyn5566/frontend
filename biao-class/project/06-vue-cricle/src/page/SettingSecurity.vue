<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="card">
          <div class="title">
            设置安全信息
            <dl>
              <dt>密码</dt>
              <dd></dd>
              <button @click="changePwdVisible = !changePwdVisible">
                <span v-if="changePwdVisible">取消</span>修改密码
              </button>
            </dl>
          </div>
          <form v-if="changePwdVisible" @submit.prevent="validateAndChangePassword" :disabled="changePwdPending">
            <fieldset>
              <div class="input-control">
                <label>
                  <span class="title">旧密码</span>
                  <input type="text" v-model="pwdForm.old">
                  <div class="error" v-if="errorPwd.old">旧密码有误</div>
                </label>
              </div>
              <div class="input-control">
                <label>
                  <span class="title">新密码</span>
                  <input type="text" v-model="pwdForm.new">
                  <div class="error" v-if="errorPwd.new">新密码长度不能小于6位并且必须是字母开头</div>
                </label>
              </div>
              <div class="input-control">
                <label>
                  <span class="title">再次输入新密码</span>
                  <input type="text" v-model="pwdForm.repNew">
                  <div class="error" v-if="errorPwd.repNew">两次新密码不一致</div>
                </label>
              </div>
              <div class="input-control">
                <button type="submit">确认提交</button>
              </div>
            </fieldset>
          </form>
        </div>
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
      changePwdVisible: false,
      changeMode: false,
      changePwdPending: false,
      pwdForm: {
        old: null,
        new: null,
        repNew: null
      },
      errorPwd: {
        old: false,
        new: false,
        repNew: false
      },
      user: store.get("user")
    };
  },
  methods: {
    validateAndChangePassword() {
      //先判断新密码是否合法
      if (this.invalidNewPwd() || this.invalidRepNewPwd()) return;

        this.changePwdPending = true;
      //验证旧密码是否存在数据库中
      api("user/find", { id: this.user.id, only: ["password"] }).then(r => {
        // pwd 从数据库取到的原始旧密码
        let pwd = r.data.password;
        if (pwd !== this.pwdForm.old) {
          this.errorPwd.old = true;
        this.changePwdPending = false;
          return;
        }
        this.errorPwd.old = false;
        this.changePassword();
      });
    },
    changePassword() {
      let user = this.user;
      user.password = this.pwdForm.new;
      api("user/update", user)
      .then(r => {
        if (!r.success) {
          alert('更新密码失败');
          return;
        }else{
          this.pwdForm = {};
          this.changePwdPending = false;
          this.changePwdVisible = false;
          alert('密码更新成功');
        }
      });
    },
    invalidNewPwd() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z][0-9A-Za-z]{6,16}$/;
      // console.log(reg.test(this.pwdForm.new));
      return this.errorPwd.new = !reg.test(this.pwdForm.new);
    },

    invalidRepNewPwd() {
      return this.errorPwd.repNew = this.pwdForm.new !== this.pwdForm.repNew;
    }
  }
};
</script>

<style scoped>
/* .content {
  margin: 0.5rem 0;
}
.content .card > * {
  display: inline-block;
  margin: 0 5px;
} */
dd {
  display: none;
}
</style>

