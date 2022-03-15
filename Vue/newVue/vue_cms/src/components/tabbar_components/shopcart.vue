<template>
  <div>
    <!-- <h1>购物车页面</h1> -->
    <p v-show="!haspage">请添加商品</p>
    <div v-show="haspage">
      <div class="goodbox" v-for="(item, index) in goodsinfo" :key="index">
      <div class="swiperBox">
        <van-switch v-model="checked" size="22px" />
      </div>
      <div class="goodinfo">
        <img :src="item.thumb_path" alt />
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="checkoption">
            <span class="sell_price">￥{{item.sell_price}}</span>
            <div class="mui-numbox">
              <button
                :disabled="dis"
                class="mui-btn-numbox-minus"
                type="button"
                @click="leftClick"
              >-</button>
              <input class="mui-input-numbox" type="number" value=" 4" />
              <button class="mui-btn-numbox-plus" type="button" @click="rightClick">+</button>
            </div>
            <a href="#">删除</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    <van-panel title="总计费（不含邮费）" status="待支付">
      <div class="pay">
        <p>
          已勾选商品
          <span>0</span> 件，
          <br />总价
          <span>123213</span>元
        </p>
        <van-button size="small" type="danger" class="paybutton" @click="pay">支付</van-button>
      </div>
    </van-panel>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      haspage: false,
      checked: true,
      checkNumber: 0,
      dis: false,
      baseUrl: "http://www.liulongbin.top:3005/",
      goodsinfo: []
    };
  },
  methods: {
    getGoodToBepaid() {
      console.log(9999);
      let ids = [];
      this.$store.state.toBePaid.forEach(item => {
        ids.push(parseInt(item.id));
      });
      console.log(ids)
      if(ids.length != 0){
        this.haspage = !this.haspage
      }
      this.axios(this.baseUrl + "api/goods/getshopcarlist/" + ids.join(',')).then(
        response => {
          console.log(response.data);
          this.goodsinfo = response.data.message
        }
      );
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
    pay() {
      Toast("暂时不支持改功能");
    }
  },
  created() {
    this.getGoodToBepaid();
  }
};
</script>

<style lang="scss" scoped>
.goodbox {
  width: 98%;
  margin: 3px auto 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 5px #666;
  .swiperBox {
    padding-left: 5px;
  }
  .goodinfo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 90px;
    }
    .checkoption .mui-numbox {
      width: 110px;
      height: 30px;
    }
  }
}
.van-panel__content .pay {
  display: flex;
  justify-content: space-between;
  p span {
    color: red;
  }
}
</style>