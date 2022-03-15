<template>
  <div id="appContainer">
    <!-- <mt-header fixed title="Vue项目">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>-->
    <van-nav-bar v-show="this.$router.fullPath != '/home'" title="Vue项目" left-text="返回" left-arrow @click-left="onClickLeft" />
    <transition>
      <router-view></router-view>
    </transition>

    <van-tabbar route fixed>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/member" icon="friends-o">会员</van-tabbar-item>
      <van-tabbar-item to="/shopcart" icon="setting-o" :info="$store.getters.getAllCount">购物车</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      flag: true,
      active: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      console.log(this.$route.fullPath)
    },
  }
};
</script>
<style lang="scss" scoped>
#appContainer {
  // margin-top: 40px;
  overflow-x: hidden;
}
.van-nav-bar {
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
  background-color: #26a2ff;
  .van-nav-bar__left {
    .van-nav-bar__text {
      color: #fff;
    }
  }
}
.mui-active {
  color: #007aff;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>