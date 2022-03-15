import requestData from '@/utils/requestData'
import { ICoupon } from '@/interfaces/checkout'
import { IUserData, ITradeDetail, IFriendDetail } from '@/interfaces/user'

/**
 * 对应后端用户相关 API
 */
class UserService {
  /**
   * 通过小程序code换取token
   */
  fetchUserAuth (params: {
  code: string
  encrypted_data?: string
  iv?: string
  }): Promise<{
    weixin_token: string // 加密后的微信token
    youhui_token: string // access_token
    phone: string
    }> {
    return requestData({
      method: 'POST',
      api: 'passport/user/miniprogram/get_token',
      params
    })
  }

  /**
   * 优惠券列表
   */
  fetchCouponLit (params: { product_info?: string }): Promise<{ lists: ICoupon[] }> {
    return requestData({
      method: 'POST',
      api: 'storex/user/coupon/get_coupon_lists',
      params
    })
  }

  /**
   * 获取用户信息
   */
  fetchUserData (): Promise<IUserData> {
    return requestData({
      method: 'POST',
      api: 'storex/user/user/get_user_info'
    })
  }

  /**
   * 获取交易记录
   */
  fetchTradeList (): Promise<{ lists: ITradeDetail[] }> {
    return requestData({
      method: 'POST',
      api: 'storex/user/trade/record_lists'
    })
  }

  /**
   * 获取分享的好友记录
   */
  fetchShareFriendList (): Promise<{
  user_code: string
  lists: IFriendDetail[]
  }> {
    return requestData({
      method: 'POST',
      api: 'storex/user/share/my_share_info'
    })
  }

  /**
   * 领取优惠券
   */
  fetchCouponReceive (params: { user_code: string }): Promise<void> {
    return requestData({
      method: 'POST',
      api: 'storex/user/coupon/receive_coupon',
      params
    })
  }

  /**
   * 获取分享的优惠券信息
   */
  fetchShareCouponDetail (params: { user_code: string }): Promise<any> {
    return requestData({
      method: 'POST',
      api: 'storex/user/share/get_share_info',
      params
    })
  }

  /**
   * 发送验证码
   */
  fetchVerifyCode (params: { mobile: string; action: 'register' | 'password_retrieval' | 'login' }): Promise<void> {
    return requestData({
      method: 'POST',
      api: 'passport/user/user/send_sms',
      params
    })
  }

  /**
   * 用户注册
   */
  fetchUserSignIn (params: {
  weixin_token: string
  /** 邀请人 */
  bind_code?: string
  /** 未传 使用默认店铺 */
  shop_key?: string
  mobile: string
  mobile_verify_code: string
  nickname: string
  /** 性别 1男2女,3:保密 */
  sex: string
  avatar: string
  }): Promise<{ access_token: string }> {
    return requestData({
      method: 'POST',
      api: 'passport/user/user/register_storex',
      params
    })
  }
}

export default new UserService()
