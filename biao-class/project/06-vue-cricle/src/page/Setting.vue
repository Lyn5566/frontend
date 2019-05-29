<template>
    <div>
        <div class="container">
            <h1>个人设置</h1>
            <div class="row">
                <div class="col-6 vertical-nav" >
                    <router-link to="/setting/me">基本设置</router-link>
                    <router-link to="/setting/security">安全设置</router-link>
                </div>
                <div class="col-18">
                    <div class="setting-content">
                    <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>
 
</style>
