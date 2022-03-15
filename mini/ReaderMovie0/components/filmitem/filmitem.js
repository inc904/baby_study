// components/filmitem/filmitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemInfo:{
      type: Object,
    }
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
    toDetail(e) {
      // console.log(e)
      // console.log(e.target.dataset.id)
      console.log(e.currentTarget)
      wx.navigateTo({
        url: '/pages/filmDetail/filmDetail?id='+ e.currentTarget.dataset.mid,
        success() {
          console.log('success')
        },
        fail(res) {
          console.log(res)
        }
      })
    }
  }
})
