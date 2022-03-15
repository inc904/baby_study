<template>
  <div>
    <!-- <h1>首页</h1> -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeImagesList" :key="item.id">
        <img :src="item" :alt="item.id" />
      </mt-swipe-item>
    </mt-swipe>

    <div class="menu-nav">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList" tag="a">
            <img src="/image/menu_images/menu1.png" />
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/shareimg">
            <img src="/image/menu_images/menu2.png" />
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="/image/menu_images/menu3.png" />
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="/image/menu_images/menu4.png" />
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="/image/menu_images/menu5.png" />
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="/image/menu_images/menu6.png" />
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      swipeImagesList: []
    };
  },
  methods: {
    getSwipeImages() {
      this.axios.get("api/getcover").then(response => {
        console.log(response.data);
        if (response.data.status != 1) {
          Toast("加载轮播图失败了。。。");
        }
        this.swipeImagesList = response.data.imgs;
      })
    }
  },
  created() {
    this.getSwipeImages();
  }
};
</script>

<style scoped lang="scss">
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    background-color: red;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none !important;
}
.mui-table-view-cell img {
  width: 60px;
  height: 60px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
  font-size: 13px;
}
</style>