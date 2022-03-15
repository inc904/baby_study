import { request } from '../../request/index'

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '全部订单',
        isActive: true,
      },
      {
        id: 1,
        value: '待付款',
        isActive: false,
      },
      {
        id: 2,
        value: '待收货',
        isActive: false,
      },
      {
        id: 3,
        value: '退换货',
        isActive: false,
      },
    ],
  },
  onLoad() {},
  onShow() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    let pages = getCurrentPages()

    console.log('onShow -> pages', pages)
    let currentPage = pages[pages.length - 1]
    let {
      options: { type },
    } = currentPage
    console.log(type)
    this.getOders(type)
    this.changeTabByIndex(type - 1)
  },
  changeTabByIndex(index) {
    const { tabs } = this.data
    console.log(tabs)
    tabs.forEach((ele, i) => {
      i === index ? (ele.isActive = true) : (ele.isActive = false)
    })
    this.setData({
      tabs,
    })
  },
  handletabsItemChange(e) {
    const { index } = e.detail
    console.log(index)
    this.changeTabByIndex(index)
    this.getOders(index + 1)
  },
  async getOders(type) {
    const res = await request({ url: '/my/order/all', data: { type } })
    console.log('res:', res)
  },
})
