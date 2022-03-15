<template>
  <div id="home">
    <van-search
      v-model="searchData"
      input-align="center"
      placeholder="请输入搜索关键词"
    />
    <van-swipe :autoplay="3000" :height="195">
      <van-swipe-item v-for="(image, index) in SwiperImages" :key="index">
        <img class="swiper-img" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 5个菜单 -->
    <van-grid :column-num="5">
      <van-grid-item
        v-for="item in channel"
        :key="item.id"
        icon="photo-o"
        :text="item.name"
      />
    </van-grid>
    <!-- 品牌制造商特供 -->
    <div class="brandList">
      <van-panel title="品牌制造商特供">
        <van-grid :column-num="2" :border="false" :gutter="2">
          <van-grid-item v-for="item in brandList" :key="item.id">
            <van-image :src="item.new_pic_url" lazy-load />
            <div class="desc">
              <h4>{{ item.name }}</h4>
              <p>{{ item.floor_price }}元起</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 新品首发 -->
    <div class="newGoodsList">
      <van-panel title="周一周四新品首发">
        <van-grid :column-num="2" :border="false" :gutter="2">
          <van-grid-item v-for="item in newGoodsList" :key="item.id">
            <van-image :src="item.list_pic_url" lazy-load />
            <div class="desc">
              <h4>{{ item.name }}</h4>
              <p>￥{{ item.retail_price }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 人气面板 -->
    <div class="hotGoodsList">
      <van-panel title="人气推荐">
        <van-card
          :centered="true"
          v-for="item in hotGoodsList"
          :key="item.id"
          :price="item.retail_price"
          :desc="item.goods_brief"
          :title="item.name"
          :thumb="item.list_pic_url"
        />
      </van-panel>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import api from '../assets/config/api'

import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)

export default {
  data() {
    return {
      mockchannelImg: [
        {
          id: 1,
          name: '居家',
          url: '/pages/category/category?id=1005000',
          icon_url: 'http://ac-3yr0g9cz.clouddn.com/c031ea3cf575f885cd1c.png',
          sort_order: 1,
        },
      ],
      searchData: '',
      data: {},
    }
  },
  computed: {
    SwiperImages: function() {
      if (this.data.banner != undefined) {
        const { banner: SwiperImages } = this.data
        return SwiperImages
      } else {
        return []
      }
    },
    channel: function() {
      if (this.data.banner != undefined) {
        const { channel } = this.data
        return channel
      } else {
        return []
      }
    },
    brandList: function() {
      if (this.data.brandList != undefined) {
        const { brandList } = this.data
        return brandList
      } else {
        return []
      }
    },
    newGoodsList: function() {
      if (this.data.newGoodsList != undefined) {
        const { newGoodsList } = this.data
        return newGoodsList
      } else {
        return []
      }
    },
    hotGoodsList: function() {
      if (this.data.hotGoodsList != undefined) {
        const { hotGoodsList } = this.data
        return hotGoodsList
      } else {
        return []
      }
    },
  },
  async mounted() {
    let result = await axios.get(api.IndexUrl)
    let { banner: SwiperImages, channel, brandList } = result.data.data
    // console.dir(channel)
    // console.log(result.data.data)
    this.data = result.data.data
  },
}
</script>
<style lang="less">
#home {
  margin-bottom: 51px;
  .swiper-img {
    width: 100%;
    height: 100%;
  }
  .brandList {
    text-align: center;
    .van-grid-item__content {
      padding: 0;
    }
    .desc {
      font-size: 14px;
      position: absolute;
      top: 10px;
      left: 10px;
      p {
        color: #999;
      }
    }
  }
  .newGoodsList {
    text-align: center;
    .desc {
      margin-top: 3px;
      font-size: 16px;
      color: #666;
      h4 {
        font-weight: 600;
      }
      p {
        font-size: 12px;
        color: red;
      }
    }
  }
  .hotGoodsList {
    .van-card {
      font-size: 14px;
      .van-card__price {
        color: red;
      }
    }
  }
}
</style>
