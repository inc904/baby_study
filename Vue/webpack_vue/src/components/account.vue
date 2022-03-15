<template>
	<div>
	<h3>用户组件</h3>
		<router-link to="/account/login">登录组件</router-link>
    <router-link to="/account/register">注册组件</router-link>
    <router-view></router-view>
	</div>
</template>
<script>
	
</script>
<style scoped>
	a{
		color: orange;
	}
</style>