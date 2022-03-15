const fetch = require('../../utils/fetch')

Page({
  data: {
    category: {}, // 当前加载得分类
    shops: [], // 当前分类下所有的店铺
    pageIndex: 0,
    pageSize: 10,
    hasMore: true
  },
  loadMore() {
    if(!this.data.hasMore) return
    let {
      pageIndex,
      pageSize
    } = this.data
    let params = {
      _page: ++pageIndex,
      _limit: pageSize
    }
    fetch(`categories/${this.data.category.id}/shops`, params).then(res => {
      console.log(res);
      
      let shops = this.data.shops.concat(res.data)
      const totalCount = parseInt(res.header['X-Total-Count'])
      console.log(res.header['X-Total-Count']);
      
      let hasMore = pageIndex * pageSize < totalCount 
      this.setData({
        shops,
        pageIndex,
        hasMore
      })
    })
  },
  onLoad(options) {
    fetch(`categories/${options.cat}`).then(res => {
      console.log(res.data)
      this.setData({
        category: res.data
      })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      this.loadMore()
    })
  },
  onReady: function () {
    if (this.data.category.name) {
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
  },
  onReachBottom() {
    // 加载下一页数据
    console.log(1)
    this.setData({

    })
    this.loadMore()
  }
})