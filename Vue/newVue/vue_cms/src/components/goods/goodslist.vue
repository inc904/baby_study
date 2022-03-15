<template>
  <div class="list-container">
    <!-- <h1>商品列表</h1> -->
    <div class="goods-container">
      <van-card
        v-for="item in goodsArray"
        :key="item.id"
        num="1"
        :price="item.sell_price"
        :origin-price="item.market_price"
        :desc="item.zhaiyao"
        :title="item.title"
        tag="热卖"
        :thumb="item.img_url"
        @click="gotoInfo(item.id)"
      >
        <div slot="tags">
          <van-tag plain type="danger">花呗</van-tag>
          <van-tag plain type="danger">七天无理由退换</van-tag>
        </div>
        <div slot="footer">
          <!-- <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>-->
          <!-- <span>123</span> -->
          <!-- <span>123</span> -->
          <van-button size="mini" disabled>库存：{{item.stock_quantity}}</van-button>
        </div>
      </van-card>
    </div>
    <van-button type="info" size="large" plain @click="getMore">加载更多</van-button>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      pageIdx: 1,
      goodsList: [],
      baseUrl: "http://www.liulongbin.top:3005/",
      pageindex: 1,
      goodsArray: []
    };
  },
  methods: {
    getGoodsList() {
      console.log(123);
      // this.axios("/api/getgod?pageIdx=" + this.pageIdx).then(response => {
      //   console.log(response.data);
      //   this.goodsList = response.data.gods;
      // })
      this.axios(
        this.baseUrl + "api/getgoods?pageindex=" + this.pageindex
      ).then(response => {
        if (response.data.status != 0) {
          Toast("获取商品列表失败了！！！");
        }
        if(response.data.message.length === 0){
          Toast('没有更多数据了。。。')
        }
        console.log(response);
        this.goodsArray = this.goodsArray.concat(response.data.message)
        this.pageindex++
      });
    },
    gotoInfo(id){
      Toast(id)
      this.$router.push({name: 'goodinfo', params: {id: id}})
    },
    getMore(){
      console.log('more')
      this.getGoodsList()
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style lang="scss">
.list-container{
  margin-bottom: 100px;
}
.goods-container {
  margin: 10px auto;
  width: 96%;
  .van-card {
    box-shadow: 1px 1px 3px #666;
    margin-bottom: 10px;
  }
}
</style>