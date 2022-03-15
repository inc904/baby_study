<template>
  <div>
    <!-- <h1>图片分享</h1> -->

    <!-- <van-tabs>
      <van-tab
        v-for="item in imgcategorys"
        :title="item.title"
        :name="item.id"
        :key="item.id"
        @click="getimages"
      >
      123
        {{ item }}
        <ul>
          <li>
            <van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <span>hhhh</span>
          </li>
        </ul>
      </van-tab>
    </van-tabs>-->
    <!-- <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in 6" :title="'选项 ' + index" :key="index">内容 {{ index }}</van-tab>
    </van-tabs>-->
    <van-tabs>
      <van-tab v-for="(item,index) in imgcategorys" :key="index">
        <div class="tab-title" slot="title" @click="onClick(item.id)">{{ item.title }}</div>
        <div class="tab-content">
          <ul>
            <li>
              <van-image width="100%" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <span>hhhh</span>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>

    <button @click="getimages(5)">asda</button>
  </div>
</template>

<script>
// import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      imgcategorys: [],
      tabs: [
        { id: "1", title: "选项一", content: "选项一内容" },
        { id: "2", title: "选项二", content: "选项二内容" }
      ],
      cateImages:[]
      // active: 2
    };
  },
  methods: {
    getImgLists() {
      this.axios.get("api/getimgcategory/").then(response => {
        console.log(response.data);
        response.data.message.unshift({ title: "全部", id: 0 });
        this.imgcategorys = response.data.message;
      });
    },
    getimages(name, title) {
      console.log(name);
      console.log(title);
      // this.$toast(title);
      // console.log(789)
      // this.axios("api/getimages/" + cateId).then(response => {
      //   console.log(response.data);
      //   if (response.data.status != 0) {
      //     Toast("加载图片数据失败了。。。");
      //   }
      // this.swipeImagesList = response.data.message;
      // })
    },
    onClick(cateId) {
      console.log(cateId);
      this.axios("api/getimages/" + cateId).then(response => {
        console.log(response.data);
        if (response.data.status != 0) {
          Toast("加载图片数据失败了。。。");
        }
        this.cateImages = response.data.message;
      });
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
</style>