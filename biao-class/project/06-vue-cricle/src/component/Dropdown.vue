<template>
  <div class="container">
    <div class="dropdown">
      <div class="filter">
        <input type="search" v-model="keyword" 
        @focus="visible=true" 
        @blur="hideData();blurEvent()">
      </div>
      <div class="list" v-if="visible">
        <div
          class="option"
          @mousedown="select(it)"
          v-for="it in result"
          :key="it.id"
        >{{it[displayBy]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  props: {
    list: {},
    displayBy: {},
    searchBy: {},
    onSelect: {},
    api: {}
  },
  data() {
    return {
      visible: false,
      keyword: "",
      result: [],
      timer:0,
    };
  },
  mounted() {
    // this.realList = [...this.list];
    //如果有api那就是异步验证
    if (this.api) {
      this.filterAsync();
    } else {
      //否则就是同步
      this.result = [...this.list];
    }
  },
  methods: {
    //失去焦点时进行表单验证
    blurEvent(){
     this.$emit('blur');
    },
    //异步过滤
    filterAsync() {
      let params = {};
      if (this.keyword) {
        params = {
          query: `where("${this.searchBy}" contains "${this.keyword}")`
        };
        api(this.api, params).then(r => (this.result = r.data || []));
      }
    },
    debounceFilterAsync(){
        if(this.timer)
        clearTimeout(this.timer);
        this.timer = setTimeout(() =>{
            this.filterAsync();
        },300)
    },
    hideData() {
      setTimeout(() => {
        this.visible = false;
      }, 300);
    },
    //同步过滤
    filter() {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(this.keyword);
      });
    },
    select(it) {
      if (!this.onSelect) return;

      this.keyword = it[this.displayBy];
      this.onSelect(it);
    }
  },
  watch: {
    keyword() {
      if (this.api) {
        this.debounceFilterAsync();
      }
      this.filter();
    }
  }
};
</script>

<style scoped>
.dropdown {
  display: block;
}
.dropdown input {
  width: 100%;
}
.option {
  padding: 0.2rem 0.5rem;
  background: #fff;
}
.option:hover {
  background: rgba(0, 0, 180, 0.2);
}
</style>
