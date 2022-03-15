const fetch = require('../../utils/fetch')
Page({
  data: {
    swiperImgs: [

      {
        src: '/assets/images/banner-01.png',
        title: '轮播图片'
      },
      {
        src: '/assets/images/banner-02.png',
        title: '轮播图片'
      }
    ],
    menuImgs: [{
        title: '美食',
        src: '/assets/icons/grid-01.png'
      },
      {
        title: '洗浴足疗',
        src: '/assets/icons/grid-02.png'
      },
      {
        title: '结婚啦',
        src: '/assets/icons/grid-03.png'
      },
      {
        title: 'KTV',
        src: '/assets/icons/grid-04.png'
      },
      {
        title: '美食',
        src: '/assets/icons/grid-01.png'
      },
      {
        title: '美食',
        src: '/assets/icons/grid-01.png'
      },
      {
        title: '美食',
        src: '/assets/icons/grid-01.png'
      },
      {
        title: '美食',
        src: '/assets/icons/grid-01.png'
      },
      {
        title: '美食',
        src: '/assets/icons/grid-01.png'
      }
    ]
  },
  onLoad(options) {
    let app = getApp()
    this.setData({
      baseUrl: app.globalData.baseUrl
    })
    fetch('slides').then(res => {
      this.setData({
        swiperImgs: res.data
      })
    })
    fetch('categories').then(res => {
      this.setData({
        menuImgs: res.data
      })
    })

  }
})