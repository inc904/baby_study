// pages/film/film.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    typeList: ["正在热映", "即将上映", "Top250"],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
    // wx.request({
    //   url: 'http://t.yushu.im/v2/movie/top250',
    //   success(res){
    //     console.log(res.data)
    //   }
    // })
    this.loadMovieData()
  },
  /**
   * 自定义函数
   * loadMovieData：加载电影数据
   * handleData: 加工得到的数据
   */
  loadMovieData(e) {
    var self = this
    var inTheaterUrl = app.globalData.BaseUrl + '/v2/movie/in_theaters' + '?start=0&count=3'
    var comingSoonUrl = app.globalData.BaseUrl + '/v2/movie/coming_soon' + '?start=0&count=3'
    var inTheaterUrl = app.globalData.BaseUrl + '/v2/movie/top250' + '?start=0&count=3'
    wx.request({
      url: inTheaterUrl,
      success(res) {
        console.log(res.data.subjects)
        self.handleData(res.data.subjects)
      }
    })
  },
  handleData(moviesData) {
    var moviesList = {
      typeList: ["正在热映", "即将上映", "Top250"],
      movies: []
    }
    for (let i = 0; i < moviesData.length; i++) {
      var data = moviesData[i]
      var temp = {
        title: data.title,
        coverImageUrl: data.images.large,
        rating: data.rating.average,
        movieId: data.id
      }
      moviesList.movies.push(temp)
    }
    console.log('moviesData:' + moviesList)
    this.setData({
      moviesList: moviesList
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