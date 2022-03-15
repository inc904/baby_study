// pages/film/film.js
const app = getApp()
const util = require ('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    typeList: ["正在热映", "即将上映", "Top250"],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheaterUrl = app.globalData.BaseUrl + '/v2/movie/in_theaters' + '?start=0&count=6'
    var comingSoonUrl = app.globalData.BaseUrl + '/v2/movie/coming_soon' + '?start=0&count=6'
    var top250 = app.globalData.BaseUrl + '/v2/movie/top250' + '?start=0&count=6'

    util.loadMovieData(inTheaterUrl,  this.handleData)
    util.loadMovieData(comingSoonUrl,  this.handleData)
    util.loadMovieData(top250,  this.handleData)
    // util.loadMovieData(top250, 'top250', util.handleData)
  },
  /**
   * 自定义函数
   * loadMovieData：加载电影数据
   * handleData: 加工得到的数据
   */
  // loadMovieData(url, itemName) {
  //   var self = this
  //   wx.request({
  //     url: url,
  //     success(res) {
  //       console.log(res)
  //       // console.log(res.data.subjects)
  //       self.handleData(res.data.subjects, itemName)
  //     }
  //   })

  // },
  handleData(moviesData) {
    var itemList = []
    var temp = {}
    var movies = this.data.movies
    for (var idx in moviesData.subjects){
      var sub = moviesData.subjects[idx]
      temp =  {
        title: sub.title,
        coverImageUrl: sub.images.large,
        rating: sub.rating.average,
        movieId: sub.id
      }
      itemList.push(temp)
    }
    movies[itemName] = itemList
    this.setData({
      movies: movies,
      itemName: itemList
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})