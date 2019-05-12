<template>
    <div class="containier">
       <h1>近期文章</h1>
       <div class="post-list">
           <div v-for="(it,index) in postList" :key="index" class="post">
           <router-link :to="'/post/'+it.id">{{it.title}}</router-link>
           <div class ="preview">{{it.content}}</div>
           </div>
       </div>
    </div>
</template>

<script>
import api from '../lib/api';
export default {
    data(){
        return {
            postList :[],
        };
    },
    mounted() {
        this.readPost();
    },
    methods: {
        readPost(){
        api('post/read')
        .then(r =>{
            if(r.success)
            this.postList = r.data;
        })
        }
    },

}
</script>