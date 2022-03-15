import Taro from '@tarojs/taro'
import { SERVER_PROTOCOL, SERVER_API_ROOT_API, SERVER_API_USER_API, DEF_REQUEST_CONFIG } from '../config'
import responseHandler from '@/utils/responseHandler'
import { IReqData, IResError } from '@/interfaces/common'
import { request } from '@tarojs/taro'
import { isObservable, toJS } from 'mobx'

/**
 *请求后端数据封装
 *@returns 直接返回data或者错误对象
 */
export default function requestData ({ api, params = {}, method = 'GET' }: IReqData) {
  // 缓存requestData参数
  const reqFunParams: IReqData = arguments[0]

  return new Promise((resolve: (data: any) => void, reject: (err: IResError) => void) => {
    const completeApi = SERVER_PROTOCOL + (/^passport/.test(api) ? SERVER_API_USER_API : SERVER_API_ROOT_API) + api
    const mergeData = Object.assign(
      {},
      DEF_REQUEST_CONFIG,
      {
        // 获取当前存储的access_token
        access_token: Taro.getStorageSync('access_token')
      },
      params
    )

    const requestParams = {}

    for (let key in mergeData) {
      if (isObservable(mergeData[key])) {
        // 如果是Mobx的Observable对象 将其转换
        requestParams[key] = toJS(mergeData[key])
      } else if (typeof mergeData[key] === 'string') {
        requestParams[key] = mergeData[key].trim()
      } else {
        requestParams[key] = mergeData[key]
      }
    }

    const options: request.Param<any> = {
      url: completeApi,
      method,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: requestParams
    }

    // 发送请求 返回promise对象
    request(options)
      .then(responseHandler(reqFunParams))
      .then(resolve)
      .catch(err => {
        console.log(err)

        reject(err)
      })
  })
}
