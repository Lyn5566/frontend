<template>
    <div class ="post-container">
        <div class="post">
        <h1>{{row.title}}</h1>
        <div class="post-content">{{row.content}}</div>
        <div class="comment-area">
            <button @click="commentFormVisible = !commentFormVisible">评论</button>
            <form v-if="commentFormVisible" class="commentForm" @submit="createComment">
                <input type="email" placeholder="邮箱" v-model="commentForm.email">
                <textarea class="" placeholder="元芳你怎么看" v-model="commentForm.content"></textarea>
                <button type="submit">提交</button>
            </form>
            <div class="comment-list">
                <div class="comment" v-for="(it,i) in commentList" :key=i>
                    <div class="email">{{it.email}}</div>
                    <div class="content">{{it.content}}</div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import api from '../lib/api'
export default {

    data(){
        return {
            row:{},
            commentFormVisible : false,
            commentForm :{},
            commentList :[],
            id : null,
        };
    },
    mounted() {
        let id = this.id= this.$route.params.id;
        this.findPost(id);
        this.readCommentList();
        this.commentForm.post_id = id;
    },
    methods: {
        findPost(id){
            api('post/find',{id})
            .then(r =>{
                if(r.success)
                this.row = r.data;
            })
           
        },
        readCommentList(){
            api('comment/read',{where:{and :{post_id:this.id}}})
            .then(r => {
                if(r.success)
                this.commentList=r.data;
            })
        },
        createComment(){
            api('comment/create',this.commentForm)
            .then(r =>{
                if(r.success)
                this.commentForm = {};
                this.readCommentList();
            })
        }
    },
    
}
</script>
<style>

 .comment-area form{
     margin-left:0;
 }
 .comment{
     margin: .5em;
 }
</style>
