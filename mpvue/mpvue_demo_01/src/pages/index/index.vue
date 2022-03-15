<template>
  <div>
    <p>index 页面。。。</p>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">获取授权</button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    getUserInfo() {
      wx.getUserInfo({
        success: (res) => {
          console.log(res)
        },
      })
    },
  },
}
</script>
