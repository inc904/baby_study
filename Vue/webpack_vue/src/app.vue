<template>
  <div class="container">
    <h1>这是APP组件111,.vue 文件定义出来的 {{ msg }}</h1>
    <router-link to="/account">用户组件</router-link>
    <router-link to="/goodlists">商品组件</router-link>
    <router-view></router-view>
  </div>
  
</template>
<script>
  export default {
    data() {
      return {
        msg: 'hello'
      }
    }
  }

 </script>
<style>
.container{
	width: 70%;
	margin: 0 auto;
}
</style>