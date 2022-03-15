// pages/cart/index.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast,
} from '../../utils/asyncWx.js'
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
    // const allChecked = cart.length ? cart.every((item) => item.checked) : false
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address: address,
    })
    this.calcAllChecked(cart)
  },
  //
  async handleChooseAddress() {
    try {
      const setting = await getSetting()
      const scopeAddress = setting.authSetting['scope.address']
      if (scopeAddress === true || scopeAddress === undefined) {
        const addressRusult = await chooseAddress()
        let { provinceName, cityName, countyName, detailInfo } = addressRusult
        addressRusult.all = provinceName + cityName + countyName + detailInfo
        wx.setStorageSync('address', addressRusult)
      } else {
        await openSetting()
        await chooseAddress()
      }
    } catch (err) {
      console.log(err)
    }
    {
      // 未封装的代码
      // wx.chooseAddress({
      //   success: (res) => {
      //   },
      // })
      // wx.getSetting({
      //   withSubscriptions: true,
      //   success: (res)=>{
      //     console.log(res)
      //   }
      // })
      // wx.getSetting({
      //   withSubscriptions: true,
      //   success:(res)=>{
      //     const scopeAdress = res.authSetting["scope.address"]
      //     if(scopeAdress === true || scopeAdress === undefined){
      //       wx.chooseAddress({
      //         success: (result1) => {
      //           console.log(result1)
      //         },
      //       })
      //     }else{
      //       wx.openSetting({
      //         withSubscriptions: true,
      //         success: (result2 =>{
      //           console.log(result2)
      //           wx.chooseAddress({
      //             success: (result3) => {
      //               console.log(result3)
      //             },
      //           })
      //         })
      //       })
      //     }
      //   }
      // })
    }
  },

  handleItemChange(e) {
    const { id } = e.currentTarget.dataset
    console.log(id)
    let { cart } = this.data
    let index = cart.findIndex((v) => v.goods_id == id)
    cart[index].checked = !cart[index].checked
    this.setData({ cart })
    wx.setStorageSync('cart', cart)
    this.calcAllChecked(cart)
  },

  calcAllChecked(cart) {
    if (cart.length == 0) {
      this.setData({ cart })
      wx.setStorageSync('cart', [])
    }
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach((item) => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price
        totalNum += item.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    wx.setStorageSync('cart', cart)
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
    })
  },

  handleAllChange(e) {
    let { cart, allChecked } = this.data
    allChecked = !allChecked
    cart.forEach((v) => (v.checked = allChecked))
    // this.calcAllChecked()
    // this.setData({
    //   cart,
    //   allChecked,
    // })
    this.calcAllChecked(cart)
  },

  async goodsNumChange(e) {
    let { num, op, id } = e.currentTarget.dataset
    console.log(num, op, id)
    let { cart } = this.data
    let index = cart.findIndex((v) => v.goods_id == id)
    switch (op) {
      case '-':
        if (num == 1) {
          const res = await showModal('确定删除商品吗？')
          if (res.confirm) {
            cart.splice(index, 1)
          } else if (res.cancle) {
            console.log(1111)
          }
          cart.splice(index, 1)
        } else {
          cart[index].num--
        }
        break
      case '+':
        cart[index].num++
        break
    }
    this.calcAllChecked(cart)
  },
  async handlePay() {
    let {
      address: { all },
      cart,
    } = this.data
    console.log(all, cart)
    // 判断收获地址 和 物品信息
    if (!all) {
      await showToast('请完善收获地址')
      return
    } else if (cart.length == 0) {
      await showToast('请添加商品')
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
})
