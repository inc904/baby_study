// pages/postDetail/postDetail.js
const artInfoData = require('../../utils/post-detail.js')
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artInfo: {},
    musicImgSrc: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    // collect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 渲染页面数据
    var id = options.id
    this.data.id = id

    this.setData({
      artInfo: artInfoData.postList[id]
    })
    // console.log(options)

    // 获取收藏状态

    // var c = this.data.collect
    // console.log(c)
    var c = wx.getStorageSync('collected')

    console.log(c)
    console.log(c[id])
    // this.data.collect = c[id]
    this.setData({
      collect: c[id]
    })
    // try {
    //   var value = wx.getStorageSync('collect')
    //   if (collect) {
    //     // Do something with return value
    //     console.log(1)
    //   }
    // } catch (e) {
    //   // Do something when catch error
    //   console.log(2)
    // }

    // 监听全局音乐播放状态
    var g_music = App.globalData.musicFlag
    console.log(g_music)
    if (App.globalData.musicFlag && App.globalData.currentMusicId　=== this.data.id) {
      // this.data.flag = true
      this.setData({
        flag: true
      })
    }
    this.listenMusic()
  },


  /**
   * 自定义函数
   * collect： 收藏功能实现
   * share: 分享功能
   * musicTap：音乐播放
   */
  collect(e) {
    self = this
    var c = wx.getStorageSync('collected') || {}
    console.log(c)

    var id = this.data.id
    // this.data.collect = c[id]
    console.log(123)
    if (this.data.collect) {
      wx.showModal({
        title: '提示',
        content: '确认取消收藏吗？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // self.data.collect = false
            self.setData({
              collect: false
            })
            c[id] = !c[id]
            wx.setStorageSync('collected', c)
            console.log(self.data.collect)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })
      // self.data.collect = true
      self.setData({
        collect: true
      })
      c[id] = true
      wx.setStorageSync('collected', c)
      // console.log(self.data.collect)
    }
  },
  share(e) {
    wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信', '分享到微博'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  listenMusic(e) {
    var self = this
    wx.onBackgroundAudioPlay(function callback() {
      self.setData({
        flag: true
      })
      App.globalData.musicFlag = true
      App.globalData.currentMusicId = self.data.id
    })
    wx.onBackgroundAudioPause(function callback() {
      self.setData({
        flag: false
      })
      App.globalData.musicFlag = false
      App.globalData.currentMusicId = null
    })
  },
  musicTap(e) {
    var self = this
    console.log(444)
    if (!this.data.flag) {
      this.setData({
        flag: true
      })
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
        title: '此时此刻',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
      })
    } else {
      this.setData({
        flag: false
      })
      wx.pauseBackgroundAudio()
    }
    App.globalData.currentMusicId = self.data.id

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