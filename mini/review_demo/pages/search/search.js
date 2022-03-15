// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: {}
  },
  formSubmit(e) { // 提交

    // console.log('form发生了submit事件，携带数据为：', e.detail.value)

    console.log(this.data.login)

    console.log(e)

    wx.switchTab({

      url: '../index/index'

    })

  },
  updateValue(e) {
    // let obj = {}
     // obj['test.b'] = 'ccc'
   this.setData({
     ['test.b']:'ccc'
   })
      let name = e.currentTarget.dataset.name;
   
      console.log(name)
      console.log(typeof name)
      let nameMap = {}
      nameMap[name] = e.detail && e.detail.value
   console.log(nameMap)
      this.setData(nameMap)
   
    },
  inputgetName(e) {

    let name = e.currentTarget.dataset.name;
console.log(name)
    let nameMap = {}

    if (name.indexOf('.')) {
      console.log(name.indexOf('.'))

      let nameList = name.split('.')

      if (this.data[nameList[0]]) {

        nameMap[nameList[0]] = this.data[nameList[0]]

      } else {

        nameMap[nameList[0]] = {}

      }

      nameMap[nameList[0]][nameList[1]] = e.detail.value

    } else {

      nameMap[name] = e.detail.value

    }

    console.log(nameMap)

    this.setData(nameMap)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
