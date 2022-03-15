<template>
  <div>
    <van-nav-bar
      :title="info.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <van-image :src="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <div style="text-align: center;">
      <h3>{{ info.name }}</h3>
      <p>{{ info.goods_brief }}</p>
      <p style="color: red;">￥{{ info.retail_price }}</p>
    </div>
    <van-cell title="请选择规格数量" is-link @click="showSkuPage" />
    <!-- <van-sku
      v-model="show"
      :sku="sku"
      :goods="info"
      :goods-id="info.id"
      :quota="info.sort_order"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    /> -->
    <van-panel title="商品参数">
      <van-cell-group>
        <van-cell
          :title="item.name"
          :value="item.value"
          v-for="(item, index) in attribute"
          :key="index"
        />
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
    </van-panel>
    <van-goods-action>
      <van-goods-action-icon icon="star-o" text="收藏" @click="onClickIcon" />
      <van-goods-action-icon
        icon="star"
        text="已收藏"
        color="#ff5000"
        @click="onClickIcon"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickButton"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      />
    </van-goods-action>
    <div class="desc" v-html="info.goods_desc"></div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      detail: {},
      info: {},
      attribute: [],
      show: false,
      sku: {
        // 数据结构见下方文档
      },
      goods: {
        // 数据结构见下方文档
      },
      messageConfig: {
        // 数据结构见下方文档
      },
    }
  },
  async created() {
    let result = await this.$http.get(this.$root.api.GoodsDetail, {
      params: { id: this.$route.params.id },
    })
    console.log(result.data.data)
    this.detail = result.data.data
    this.info = this.detail.info
    this.attribute = this.detail.attribute
  },
  computed: {
    gallery: function() {
      if (!this.detail.gallery) return
      return this.detail.gallery
    },
  },
  methods: {
    getDetail: function() {},
    onClickLeft: function() {
      this.$router.go(-1)
    },
    showSkuPage: function() {
      console.log(123)
    },
    onClickIcon() {
      Toast('点击图标')
    },
    onClickButton() {
      Toast('点击按钮')
    },
    onBuyClicked: function() {
      console.log('buy')
    },
    onAddCartClicked: function() {
      console.log('cart')
    },
  },
}
</script>
<style lang="less">
.desc {
  margin-bottom: 70px;
  width: 100%;
  img {
    width: 100%;
    vertical-align: middle;
  }
}
</style>
