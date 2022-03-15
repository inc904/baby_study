<template>
  <div>
    <!-- <h1>图片详情---{{this.$route.params.id}}</h1> -->
    <h2>{{photoDesc.intro}}</h2>
    <ul class="img-container">
      <li v-for="(item, index) in images" :key="index" class="img-box">
        <img :src="item" alt />
      </li>
    </ul>
    <!-- <cmt :phoId="this.phoId"></cmt> -->
    
  </div>
</template>

<script>
import cmt from "../sub_components/comment.vue";

export default {
  data() {
    return {
      phoId: this.$route.params.id,
      photoDesc: [],
      images: [],
      show: false,
      index: 0
    };
  },
  components:{
    cmt
  },
  methods: {
    getImgDesc() {
      this.axios("api/getphodetail?phoId=" + this.phoId).then(response => {
        console.log(response.data);
        this.photoDesc = response.data.pho;
        this.images = response.data.pho.phos;
      });
    },
    onChange(index) {
      this.index = index;
    }
  },
  created() {
    this.getImgDesc();
  }
};
</script>

<style lang="scss">
h2{
  text-align: center;
}
.img-container {
  display: flex;
  justify-content: space-around;
  .img-box {
    width: 100px;
    height: 150px;
    img {
      width: 100px;
      height: 100%;
    }
  }
}
</style>