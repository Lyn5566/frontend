<template>
<div id="app">
<Nav></Nav>
<router-view></router-view>
</div>
</template>

<script>

import Nav from './component/Nav'
import './css/global.css'

export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>

</style>
