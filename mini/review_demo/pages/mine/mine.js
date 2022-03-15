// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'hello wechat!',
    num: '100',
    isGirl: false,
    obj: null,
    person: {
      name: 'Jack',
      age: 18
    },
    list: [{
        name: 'aaa',
        id: 1
      },
      {
        name: 'vvv',
        id: 2
      },
      {
        name: 'ddd',
        id: 3
      },
      {
        name: 'ccc',
        id: 4
      }
    ]
  },
  changeMsg() {
    this.setData({
      msg: 'hello myWe!'
    })
  },
  inputEdit(e) {
    console.log(e.detail)
    console.log(e.target)

    console.log(e.detail.value)
    this.setData({
      msg: e.detail.value
    })
  },
  clickHandler(e) {
    // console.log(e)
    // console.log(e.target.dataset)

    let {
      dataset
    } = e
    console.log(dataset)

    // let {dataset: {gender}} = e
    // console.log(gender)     
    let {
      detail: {
        x,
        y
      }
    } = e
    // console.log(detail) // Error
    
    let {
      target: {
        dataset: {
          gender
        }
      }
    } = e
    console.log(gender)
    console.log(x, y)
    // const info = {
    //   person: {
    //     name: 'xiaobe',
    //     other: {
    //       age: 22,
    //     }
    //   },
    //   song: 'rolling',
    // }
    // // 解构person的内容
    // const { person: { name, other: { age } } } = info;
    // console.log(age)
    // console.log(name)
    // // 解构song
    // const { song } = info;
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
