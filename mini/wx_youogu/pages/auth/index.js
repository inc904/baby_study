// pages/auth/index.js
import { login } from '../../utils/asyncWx.js'
import { request } from '../../request/index'
Page({
  data: {},
  onload() {},
  async handleGetUserInfo(e) {
    try {
      console.log(e)
      let { encryptedData, iv, rawData, signature } = e.detail
      let { code } = await login()
      console.log('handleGetUserInfo -> code', code)
      const loginParams = {
        encryptedData,
        iv,
        rawData,
        signature,
        code,
      }
      const res = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: 'post',
      })
      console.log('handleGetUserInfo -> res', res)

      let mockToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      wx.setStorageSync('token', mockToken)
      wx.navigateBack({
        delta: 1,
      })
    } catch (err) {
      console.log('handleGetUserInfo -> err', err)
    }
  },
})
