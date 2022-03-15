<template>
  <div id="appContainer">
    <mt-header fixed title="Vue项目"></mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <!-- <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item" tag="a">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/member" class="mui-tab-item"  tag="a">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="shopcart" class="mui-tab-item"  tag="a">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">9</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item" tag="a">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>-->
    <!-- <van-tabbar v-model="active">
      <router-link to="/home" tag="div">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      </router-link>
      <van-tabbar-item icon="friends-o">会员</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
    </van-tabbar>-->

    <van-tabbar route fixed>
      <van-tabbar-item  to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item  to="/member" icon="friends-o">会员</van-tabbar-item>
      <van-tabbar-item  to="/shopcart" icon="setting-o">购物车</van-tabbar-item>
      <van-tabbar-item  to="/search" icon="search">搜索</van-tabbar-item>
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
  }
};
</script>
<style lang="scss" scoped>
#appContainer {
  margin-top: 40px;
  overflow-x: hidden;
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