<template>
    <div>
        <div class="scroll-load">
            <button class="main-btn" @click="scrollNext">加载更多</button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        page:{}
    },
    mounted() {
        this.current = this.page || 1;
    },
    data(){
        return{

            current:1,
        }
    },

    methods: {
        scrollNext(){
            this.$emit('flip',++this.current);
        }
    },
}
</script>

<style scoped>
.scroll-load{
    text-align: center;
}
.main-btn{
    width: 100%;
}
</style>
