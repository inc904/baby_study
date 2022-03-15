<template>
  <div>
    <h2>登录组件{{createTime}}</h2>
    <p>{{subTime}}</p>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      createTime: new Date(),
      subTime: Date.now()
    }
  }
}
</script>