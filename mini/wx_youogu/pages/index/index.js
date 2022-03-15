//index.js
//获取应用实例
import { request } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    categoriesList: [],
    floorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlunbolist()
    this.getcategoriesList()
    this.getfloorList()
  },
  getlunbolist() {
    // send request
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result)
    //     this.setData({
    //       swiperList: result.data.message,
    //     })
    //   },
    // })
    request({
      url: '/home/swiperdata',
    }).then((result) => {
      this.setData({
        swiperList: result,
      })
    })
  },
  getcategoriesList() {
    request({
      url: '/home/catitems',
    }).then((result) => {
      this.setData({
        categoriesList: result,
      })
    })
  },
  getfloorList() {
    request({
      url: '/home/floordata',
    }).then((result) => {
      this.setData({
        floorList: result,
      })
    })
  },
})
