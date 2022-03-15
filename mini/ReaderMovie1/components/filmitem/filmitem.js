// components/filmitem/filmitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
      console.log(2)
      wx.navigateTo({
        url: '/pages/filmDetail/filmDetail',
        success() {
          console.log(1)
        },
        fail(res) {
          console.log(res)
        }
      })
      console.log(123)
    }
  }
})
