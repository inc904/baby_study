/** 服务器协议 production 必须是https  */
export let SERVER_PROTOCOL = 'https://'

/** 后端 API 地址 */
export const SERVER_API_ROOT_API = 'storex.api.dev.loverenren.com/rest/2.0/'

/** 后端 用户 API 地址 */
export const SERVER_API_USER_API = 'passport.api.dev.loverenren.com/rest/2.0/'

/** 请求默认参数 */
export const DEF_REQUEST_CONFIG = {
  access_token: '', // 用户登录获取，未登录状态不用传。本地存储 key为 access_token
  shop_key: '100' // 用于表示哪家门店，初始扫码进入携带，默认100，或是选择门店时获取（选择门店暂时不开通）
}
