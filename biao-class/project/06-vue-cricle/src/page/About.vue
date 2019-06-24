<template>
  <div>
    <Dropdown 
    :list="userList" 
    displayBy="username" 
    searchBy="username"
    :onSelect="onSelect"
    api="user/read"
    />
  </div>
</template>

<script>
import Dropdown from "../component/Dropdown";
export default {
  components: {
    Dropdown
  },
  methods:{
      onSelect(it){
          console.log(it);
      }
  },
  data() {
    return {
      userList: [
        {
          username: "tanaka",
          name: "田中",
          age: 35
        },
        {
          username: "yosimura",
          name: "吉村",
          age: 45
        },
        {
          username: "handa",
          name: "半田",
          age: 36
        }
      ]
    };
  }
};
</script>