<template>
  <div class="pagination">
    <div class="btn-group">
      <button :class="(active == 1 ? 'active' : '') + ' item'" @click="first()">首页</button>
      <button class="item" @click="prev()">上一页</button>
    </div>
    <div class="btn-group">
      <button
        class="item"
        @click="change(it)"
        v-if="pageLimit(it)"
        :class="it == active ? 'active' : ''"
        v-for="(it,i) in totalPage"
        :key="i"
      >{{it}}</button>
    </div>
    <div class="btn-group">
      <button class="item" @click="next()">下一页</button>
      <button :class="(active == totalPage ? 'active' : '') + ' item'" @click="last()">末页</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //默认当前页为第一页
      active: 1
    };
  },
  props: {
    totalCount: {},
    limit: {},
    onChange: {
      default: function() {}
    },
    radius: {
      default: 2
    }
  },

  mounted() {
    this.$props;
  },
  methods: {
    change(page) {
      if (page < 1 || page > this.totalPage) return;

      this.active = page;
      //想使用该组件的（父组件）传递值
      let onChange = this.$props.onChange;
      onChange && onChange(page);
    },
    first() {
      this.change(1);
    },
    last() {
      this.change(this.totalPage);
    },
    prev() {
      this.change(this.active - 1);
    },
    next() {
      this.change(this.active + 1);
    },
    // 翻页限制
    pageLimit(it) {
      // 比如：2，3，4，5，6 页，当前页为第4页，（2-4）= 6-4，(3-4) = 5-3 .两边的页码数到中心的距离都是相等的，相当于一个半径
      return Math.abs(it - this.active) <= this.$props.radius;
    }
  },
  //计算总页数
  computed: {
    totalPage() {
      let page = this.$props;
      return Math.ceil(page.totalCount / page.limit);
    }
  }
};
</script>

<style scoped>
.pagination > * {
  display: inline-block;
  margin-right: 10px;
}
.pagination {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  text-align: center;
}
.item.active {
  background: #000;
  color: #fff;
  border-color: #fff;
}
.item {
  padding: 0.2rem 0.4rem;
}
</style>
