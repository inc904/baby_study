// pages/login/index.js
Page({
  data: {},
  onLoad() {},
  handleGetuserinfo(e) {
    console.log(e)
    let { userInfo } = e.detail
    console.log(userInfo)
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })
  },
})
