export interface IPager {
  page: number
  num: number
  count?: number
}

/** 请求参数 */
export interface IReqData {
  /** 后端API */
  api: string

  /** 请求参数*/
  params?: { [key: string]: any }
  method?: 'POST' | 'GET'
}

/** 错误返回 */
export interface IResError {
  code: number
  error_code?: number
  message?: string
  data?: any
}

/** banner数据 */
export interface IBannerData {
  /** 事件类型 h5: 链接到html页面 （目前只设计这一个，后期会扩展，比如链接到小程序页面） */
  action: 'h5'
  /** banner展示图片 */
  image: string
  params: {
    title: string
    url: string
  }
}
