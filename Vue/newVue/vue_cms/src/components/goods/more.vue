<template>
  <div>
    <h1>more</h1>
     <van-panel :title="goodDesc.title" desc="官方正品" status="正品">
      <div v-html="goodDesc.content" class="desc-box"></div>
    </van-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "http://www.liulongbin.top:3005/",
      id: this.$route.params.id,
      goodDesc: {}
    };
  },
  methods: {
    getmore() {
      // 获取更多图文详情
      // this.axios(this.baseUrl + "api/getdesc/" + this.id).then(
      this.axios(this.baseUrl + "api/goods/getdesc/" + this.id).then(
        response => {
          console.log(response.data);
          this.goodDesc = response.data.message[0]
        }
      );
    }
  },
  created() {
    this.getmore();
  }
};
</script>

<style>
</style>