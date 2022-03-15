import { IBannerData } from './common'

export interface IUserData {
  /** 余额 */
  money: number
  /** 折扣 */
  discount_text: string
  /** 1:VIP 2：不是VIP  */
  is_vip: 1 | 2
  /** 优惠券数量 */
  coupon_num: number
  /** 可提现的额度，单位分 */
  withdrawable_cash: number
  /** app下载二维码图片 */
  app_download_code: string
  /** 用户页面banner数据 */
  banner_lists: IBannerData[]
}

export interface ITradeDetail {
  /** 金额 单位分 */
  money: number
  /** 交易类型 */
  trade_type: string
  /** 操作类型，1加钱 2减钱 */
  operate_type: 1 | 2
  /** 时间 */
  insert_date: '2019-03-04 15:05:05'
}

export interface IFriendDetail {
  nickname: string
  avatar: string
}
