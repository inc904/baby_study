// pages/goods_detail/index.js
import { request } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_detail: {},
  },
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    console.log(goods_id)
    this.setData({
      goods_id,
    })
    this.getGoodsDetail(goods_id)
  },

  async getGoodsDetail(goods_id) {
    const result = await request({ url: '/goods/detail', data: { goods_id } })
    console.log(result)
    this.goodsInfo = result
    let { pics, goods_price, goods_name, goods_introduce } = result
    this.setData({
      goods_detail: {
        pics,
        goods_price,
        goods_name,
        goods_introduce,
      },
    })
  },

  handlePreviewImage(e) {
    console.log(e)
    let { url } = e.currentTarget.dataset
    let urls = this.data.goods_detail.pics.map((v) => v.pics_mid)
    wx.previewImage({
      current: url,
      urls,
    })
  },

  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex((v) => v.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      // 不存在 第一次添加
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    } else {
      // num++
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    })
  },
})
