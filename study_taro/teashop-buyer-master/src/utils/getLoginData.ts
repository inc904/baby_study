import Taro from '@tarojs/taro'
import userService from '@/services/userService'
/**
 * 更新登录token数据
 * 或者去注册
 */
const getLoginData: () => Promise<any> = () =>
  new Promise((resove, reject) => {
    // 获取weixin_code
    Taro.login()
      .then(res => {
        if (res.code) {
          console.log('微信Code: ', res.code)

          return Taro.getUserInfo({ withCredentials: true }).then(
            userData => userService.fetchUserAuth({ code: res.code, encrypted_data: userData.encryptedData, iv: userData.iv }),
            () => userService.fetchUserAuth({ code: res.code }) // 使用code换取token
          )
        } else {
          return Promise.reject({ code: res.code, message: res.errMsg })
        }
      })
      .then(res => {
        // 判断用户已注册
        if (res.youhui_token) {
          // 登录成功
          Taro.setStorageSync('access_token', res.youhui_token)
          Taro.setStorageSync('weixin_token', res.weixin_token)

          resove(res)
        } else {
          const currentPages = Taro.getCurrentPages()
          const route = currentPages[currentPages.length - 1].route

          // 保存当前页数据 用于注册弹窗
          Taro.getApp().signPageData = { redirectPage: route }

          if (route !== 'pages/user/index') {
            // 跳转到用户页注册
            Taro.switchTab({ url: '/pages/user/index' })
            reject({ code: 401, message: '跳转到用户页注册' })
          } else {
            reject({ code: 401, message: '用户注册，当前就是个人页' })
          }
        }
      })
      .catch(err => {
        console.log('Error:' + err.message)

        reject(err)
      })
  })

export default getLoginData
