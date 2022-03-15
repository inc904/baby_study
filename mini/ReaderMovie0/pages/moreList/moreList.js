// pages/moreList/moreList.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {


    typeList: ["电影速递"],
    movies: [],
    currentpage: 0,
    step: 20

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      title: options.title
    })
    // var inTheaterUrl = app.globalData.BaseUrl + '/v2/movie/in_theaters' + '?start=0&count=3'
    // var comingSoonUrl = app.globalData.BaseUrl + '/v2/movie/coming_soon' + '?start=0&count=3'
    // var top250 = app.globalData.BaseUrl + '/v2/movie/top250' + '?start=0&count=3'
    // console.log(this.data.title)
    var title = this.data.title
    switch (title) {
      case 'top250':
        var url = app.globalData.BaseUrl + '/v2/movie/top250'
        var category = 'top250'
        break
      case '正在热映':
        var url = app.globalData.BaseUrl + '/v2/movie/in_theaters'
        var category = 'in_theaters'

        break
      case '即将上映':
        var url = app.globalData.BaseUrl + '/v2/movie/coming_soon'
        var category = 'coming_soon'
        break
    }
    util.loadMovieData(url, category, this.handleData)
    // this.loadMovieData(comingSoonUrl, 'comingSoonUrl')
    // this.loadMovieData(top250, 'top250')
    this.setData({
      url: url,
      category: category
    })

  },
  lowerEvent: function(e){
    var self = this
    console.log(this.data.currentpage)
    var url = this.data.url
    var category = this.data.category
    url = url + '?start=' + this.data.currentpage * this.data.step + 'count='+ this.data.step 
    util.loadMovieData(url, category, self.handleData())
    // console.log(url)
  },

  // loadMovieData(url, itemName) {
  //   var self = this
  //   wx.request({
  //     url: url,
  //     success(res) {
  //       // console.log(res)
  //       // console.log(res.data.subjects)
  //       self.handleData(res.data.subjects, itemName)
  //     }
  //   })

  // },
  handleData: function(moviesData, itemName) {
    console.log(moviesData)
    var itemList = []
    var temp = {}
    var movies = this.data.movies

    // for (let i = 0; i < moviesData.length; i++) {
    //   var data = moviesData[i]
    //   temp = {
    //     title: data.title,
    //     coverImageUrl: data.images.large,
    //     rating: data.rating.average,
    //     movieId: data.id
    //   }
    //   itemList.push(temp)
    // }
    for (var idx in moviesData.subjects) {
      var sub = moviesData.subjects[idx]
      temp = {
        title: sub.title,
        coverImageUrl: sub.images.large,
        rating: sub.rating.average,
        movieId: sub.id
      }
      itemList.push(temp)
    }
    console.log(itemList)
    if(this.data.movies){
      movies.concat(itemList)
    }else{
      // movies = movies
    movies = itemList
    }
    this.setData({
      movies: itemList,
      currentpage: this.data.currentpage++
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
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