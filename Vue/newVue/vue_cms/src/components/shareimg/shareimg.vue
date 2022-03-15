<template>
  <div class="img-contanier">
    <!-- <h1>图片分享</h1> -->
    <van-tabs>
      <van-tab v-for="(item,index) in imgcategorys" :key="index">
        <div
          class="tab-title"
          slot="title"
          @click="onClick(false, item)"
        >{{ item === "" ? "全部" : item }}</div>
        <div class="tab-content">
          <ul>
            <router-link v-for="item in cateImages" :key="item.phoId" class="pho-box" :to="'/home/imginfo/'+item.phoId" tag="li">
              <van-image width="100%" lazy-load :src="item.phos[0]"></van-image>
              <p class="pho-info">{{item.intro}}</p>
            </router-link>
          </ul>
        </div>
      </van-tab>
    </van-tabs>

    <!-- <button @click="getimages(5)">asda</button> -->
  </div>
</template>

<script>
// import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      imgcategorys: [],
      cateImages: [],
      pageIdx: 1
      // active: 2
    };
  },
  methods: {
    getImgLists() {
      this.axios.get("api/getphotypes").then(response => {
        console.log(response.data);
        response.data.types.unshift("");
        this.imgcategorys = response.data.types;
        this.onClick(false, "");
      });
    },
    getimages(name, title) {
      console.log(name);
      console.log(title);
    },
    onClick(append, type) {
      // if (type != undefined) this.type = type;
      if (append) this.pageIdx = this.pageIdx + 1;
      else this.pageIdx = 1;
      this.axios("api/getpho?type=" + type + "&pageIdx=" + this.pageIdx).then(
        response => {
          console.log(response.data);
          this.cateImages = response.data.phos;
        }
      );
    }
  },
  created() {
    this.getImgLists();
  },
  mounted() {
    // mui(".mui-scroll-wrapper").scroll({
    //   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.img-contanier {
  margin-bottom: 100px;
  li.pho-box {
    margin: 0 auto;
    width: 90%;
    margin-bottom: 20px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 1px 5px #666;
    .van-image {
      .van-image__img {
        vertical-align: middle;
      }
      img {
        vertical-align: middle;
      }
    }
    .pho-info {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0;
      color: #fff;
      font-size: 16px;
      text-indent: 16px;
      background-color: rgba(0, 0, 0, 0.5);
      // background-color: red;
      margin: 0;
    }
  }
}
</style>