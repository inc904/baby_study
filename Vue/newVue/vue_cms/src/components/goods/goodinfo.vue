<template>
  <div class="container">
    <!-- <h1>商品详情--{{$route.params.id}}</h1> -->
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
      <span class="redball" v-show="ballFlag"></span>
    </transition>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in swipeImg" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-panel :title="goodInfo.title" :desc="goodInfo.goods_no" status="折扣" :price="123">
      <div>{{goodInfo.title}}</div>
      <p class="p-box">
        <span class="price">￥{{goodInfo.sell_price}}</span>
        <span class="origin_price">￥{{goodInfo.market_price}}</span>
        <span>库存：{{goodInfo.stock_quantity}}</span>
      </p>
      <div slot="footer">
        <h5 class="mui-content-padded">购买数量</h5>
        <div class="mui-numbox">
          <button :disabled="dis" class="mui-btn-numbox-minus" type="button" @click="leftClick">-</button>
          <input class="mui-input-numbox" type="number" v-model="checkNumber" />
          <button class="mui-btn-numbox-plus" type="button" @click="rightClick">+</button>
        </div>
        <van-button size="small">立即购买</van-button>
        <van-button size="small" type="danger" @click="toggleball">加入购物车</van-button>
      </div>
    </van-panel>

    <van-panel :title="goodDesc.title" :desc="'序列号：'+goodInfo.goods_no" status="正品">
      <div v-html="goodDesc.content" class="desc-box"></div>
    </van-panel>
    <van-button size="large" plain type="info" @click="gotoMore(87)">更多介绍</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Toast } from "vant";
Vue.use(Swipe).use(SwipeItem);

export default {
  data() {
    return {
      baseUrl: "http://www.liulongbin.top:3005/",
      id: this.$route.params.id,
      goodInfo: {},
      swipeImg: [],
      goodDesc: {},
      checkNumber: 1,
      dis: false,
      ballFlag: true
    };
  },
  methods: {
    getGoodinfo() {
      console.log("获取商品详情");
      // 获取销售详情
      this.axios(this.baseUrl + "api/goods/getinfo/" + this.id).then(
        response => {
          console.log(response.data);
          this.goodInfo = response.data.message[0];
        }
      );
      // 获取详情轮播图
      this.axios(this.baseUrl + "api//getthumimages/" + this.id).then(
        response => {
          console.log(response.data);
          this.swipeImg = response.data.message;
        }
      );
      // 获取详情图文介绍
      this.axios(this.baseUrl + "api/goods/getdesc/" + this.id).then(
        response => {
          console.log(response.data);
          this.goodDesc = response.data.message[0];
        }
      );
    },
    gotoMore(id) {
      this.$router.push({ name: "moredesc", params: { id: id } });
    },
    leftClick() {
      console.log(1);
      this.checkNumber--;
      if (this.checkNumber <= 0) {
        Toast("不能再少了。。");
        this.checkNumber = 0;
        this.dis = true;
      }
    },
    rightClick() {
      this.dis = false;
      this.checkNumber++;
    },
    toggleball() {
      console.log(1);
      this.ballFlag = !this.ballFlag;
      let goods = {id : this.id, count: this.checkNumber, sellPrice: this.goodInfo.sell_price, selected: true}
      this.$store.commit('addToCart', goods)
      Toast('添加购物车成功')
    },
    beforeEnter: el => {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offwidth;
      el.style.transform = "translate(20px, 49px)";
      el.style.transition = "all 1s ease";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    }
  },

  created() {
    this.getGoodinfo();
  }
};
</script>

<style lang="scss">
.container {
  padding-bottom: 100px;
}
.van-swipe-item {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.van-panel__content div {
  padding: 16px;
}
.redball {
  display: inline-block;
  background-color: black;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  // transform: translate(18px, 220px);
  top: 400px;
  left: 200px;
  z-index: 99;
}
.footer {
  .mui-numbox {
    width: 110px;
    height: 30px;
  }
  h5.mui-content-padded {
    padding: 0;
  }
}
.van-panel__footer .van-hairline--top {
  h5.mui-content-padded {
    padding: 0;
  }
}
.p-box {
  display: flex;
  justify-content: space-around;
  .price {
    display: inline-block;
    color: #ee0a24;
    font-weight: 500;
    font-size: 18px;
  }
  .origin_price {
    display: inline-block;
    margin-left: 5px;
    color: #7d7e80;
    font-size: 10px;
    text-decoration: line-through;
    font-size: 18px;
  }
}
.desc-box {
  p {
    margin: 0;
  }
  p:nth-child(1) {
    padding: 5px;
    text-indent: 16px;
  }
  img {
    width: 100%;
  }
}
</style>