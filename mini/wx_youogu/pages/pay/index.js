// pages/pay/index.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast,
} from '../../utils/asyncWx.js'
import { request } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow: function () {
    const address = wx.getStorageSync('address') || {}
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address: address,
    })
    this.calcAllChecked(cart)
  },

  calcAllChecked(cart) {
    if (cart.length == 0) {
      console.log('asdasd')
      this.setData({ cart })
      wx.setStorageSync('cart', [])
    }
    let totalPrice = 0
    let totalNum = 0
    let checkedCart = cart.filter((v) => v.checked)
    checkedCart.forEach((item) => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
      }
    })
    wx.setStorageSync('checkedCart', checkedCart)
    console.log(checkedCart)
    this.setData({
      checkedCart,
      totalPrice,
      totalNum,
    })
  },
  async handlePay() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 订单详情
    let cart = this.data.checkedCart
    let newgoodsList = []
    cart.forEach((item) => {
      console.log(1111)
      newgoodsList.push({
        goods_id: item.goods_id,
        goods_num: item.num,
        goods_price: item.goods_price,
      })
    })
    console.log('handlePay -> newgoodsList', newgoodsList)
    //  请求头参数
    const header = {
      Authorization: token,
    }
    let dev = true
    if (dev) {
      showToast('功能开发中~，暂时模拟支付哦', 5000)
      // 支付完成后，商品数据从购物车数据中删除
      let cart = wx.getStorageSync('cart')
      let newCart = cart.filter((ele) => !ele.checked)
      this.setData({
        cart: newCart,
      })
      wx.setStorageSync('cart', newCart)
      console.log('handlePay -> cart', cart)
      // 跳转 订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } else {
      // 请求体参数
      const order_pramas = {
        order_price: this.data.totalPrice,
        consignee_addr: this.data.address.all,
        goods: newgoodsList,
      }
      console.log('handlePay -> order_pramas', order_pramas)
      const { order_number } = await request({
        url: '/my/orders/create',
        header,
        data: order_pramas,
        method: 'POST',
      })
      const res = await request({
        url: '/my/orders/req_unifiedorder',
        header,
        data: {
          order_number,
        },
        method: 'POST',
      })
      console.log('handlePay -> res', res)
    }
  },
})
