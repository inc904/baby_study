// pages/search/index.js
import { request } from '../../request/index'
Page({
  data: {
    goods: [],
    isFocus: false,
  },
  timerID: -1,
  onLoad() {},
  handleInput(e) {
    console.log(e)
    let { value: searchValue } = e.detail
    console.log(searchValue)
    if (!searchValue.trim()) {
      this.setData({
        isFocus: false,
        goods: [],
      })
      return
    }
    this.setData({
      isFocus: true,
    })
    clearTimeout(this.timerID)
    this.timerID = setTimeout(() => {
      this.qSearch(searchValue.trim())
    }, 1000)
  },
  async qSearch(query) {
    const res = await request({ url: '/goods/qsearch', data: { query } })
    console.log(res)
    this.setData({
      goods: res,
    })
  },
})
