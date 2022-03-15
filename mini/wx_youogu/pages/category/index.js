// pages/category/index.js
import { request } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoriesList: [],
    leftCate: [],
    rightContent: [],
    activeIndex: 0,
    rightScrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      // dont have
      this.getcategoriesList()
    } else {
      // 过期时间检验
      if (Date.now - Cates.time > 1000 * 60 * 60 * 5) {
        // 过期，重新发送请求
        this.getcategoriesList()
      } else {
        // let categoriesList = Cates.cates
        // let leftCate = Cates.cates.map((v) => v.cat_name)
        // let rightContent = Cates.cates[0].children
        // this.setData({
        //   categoriesList,
        //   leftCate,
        //   rightContent,
        // })
        this.setListData(Cates.cates)
      }
    }
  },
  setListData(data) {
    let categoriesList = data
    let leftCate = categoriesList.map((v) => v.cat_name)
    let rightContent = categoriesList[0].children
    this.setData({
      categoriesList,
      leftCate,
      rightContent,
    })
  },
  // getcategoriesList() {
  //   request({
  //     url: '/categories',
  //   }).then((result) => {
  //     wx.setStorageSync('cates', {
  //       time: Date.now(),
  //       cates: result.data.message,
  //     })
  //     // let categoriesList = result.data.message
  //     // let leftCate = categoriesList.map((v) => v.cat_name)
  //     // let rightContent = categoriesList[0].children
  //     // this.setData({
  //     //   categoriesList,
  //     //   leftCate,
  //     //   rightContent,
  //     // })
  //     this.setListData(result.data.message)
  //   })
  // },
  async getcategoriesList() {
    const result = await request({
      url: '/categories',
    })
    wx.setStorageSync('cates', {
      time: Date.now(),
      cates: result,
    })

    this.setListData(result)
  },
  handleMenuTap(e) {
    // 菜单点击
    console.log(e)
    let { index } = e.currentTarget.dataset
    let rightContent = this.data.categoriesList[index].children

    this.setData({
      activeIndex: index,
      rightContent,
      rightScrollTop: 0,
    })
  },
})
