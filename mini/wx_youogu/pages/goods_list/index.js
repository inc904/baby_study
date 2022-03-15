// pages/goods_list/index.js
import {
  request
} from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true,
      },
      {
        id: 1,
        value: '销量',
        isActive: false,
      },
      {
        id: 2,
        value: '价格',
        isActive: false,
      },
    ],
    goodsList: [],
    hasLoadAll: false,
  },
  // 接口使用的数据
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  totalPage: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      cat_id
    } = options
    console.log(cat_id)
    this.QueryParams.cid = cat_id
    this.getGoodsList()
  },

  /**
   * 页面触底 函数
   */
  onReachBottom() {
    console.log('bottom!!')

    if (this.totalPage == this.QueryParams.pagenum) {
      console.log('no')
      this.setData({
        hasLoadAll: true,
      })
      wx.showToast({
        title: '没有下一页数据了~',
      })
    } else {
      this.QueryParams.pagenum++
      console.log('+1')
      this.getGoodsList()
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },
  handletabsItemChange(e) {
    const {
      index
    } = e.detail
    console.log(index)
    const {
      tabs
    } = this.data
    console.log(tabs)
    tabs.forEach((ele, i) => {
      i === index ? (ele.isActive = true) : (ele.isActive = false)
    })
    this.setData({
      tabs,
    })
  },
  async getGoodsList() {
    const result = await request({
      url: '/goods/search',
      data: this.QueryParams,
    })
    console.log(result)
    let totalNum = result.total
    this.totalPage = Math.ceil(totalNum / this.QueryParams.pagesize)
    console.log(this.totalPage)
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods],
    })
    wx.stopPullDownRefresh()
  },
})