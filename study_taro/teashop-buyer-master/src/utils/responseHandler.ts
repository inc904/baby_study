import { IResError, IReqData } from 'src/interfaces/common'
import Taro, { request } from '@tarojs/taro'
import getLoginData from './getLoginData'
import requestData from './requestData'

/**
 * 处理返回值
 * @param {request.Param<any>} requestOption 用于过期登录请求失败 再次发起请求
 * @returns {(response: request.Promised<any>) => Promise<any>} 后端返回的response对象，微信小程序的数据结构 解析 返回data或者错误对象
 */
export default function responseHandler (requestOption: IReqData) {
  return (response: request.Promised<any>) =>
    new Promise((resolve: (data: any) => void, reject: (data: IResError) => void) => {
      // 服务器返回状态
      if (response.statusCode !== 200) {
        return reject({ code: response.statusCode, data: response.data })
      }

      if (response.data.error_code === 120101 || response.data.error_code === 120107) {
        console.log('token出错：', { code: 401, error_code: response.data.error_code, message: response.data.error_msg })
        console.log('等待重发请求：', requestOption)

        // 获取或者更新Token
        getLoginData()
          .then(data => {
            console.log('更新token成功：', data)
            console.log('重发请求：', requestOption)

            // 获取成功 请求重发
            requestData(requestOption).then(res => {
              resolve(res)
            })
          })
          .catch(err => {
            reject(err)
          })

        return true
      } else if (response.data.error_code) {
        // toast 报错提示
        Taro.showToast({ title: `${response.data.error_msg} `, icon: 'none' })

        // 业务报错
        return reject({ code: response.data.error_code, message: response.data.error_msg })
      }

      // 正常
      resolve(response.data.response_data)
    })
}
