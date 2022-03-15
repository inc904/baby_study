import { observable, IObservableArray, action, runInAction, computed } from 'mobx'
import { ICoupon } from '@/interfaces/checkout'
import userService from '@/services/userService'
import { IUserData, ITradeDetail } from '@/interfaces/user'

export interface IUserStore {
  /** 优惠券列表 */
  couponList: Array<ICoupon>
  /** 可用优惠券 */
  openCouponList: Array<ICoupon>
  /** 不可用优惠券 */
  unCouponList: Array<ICoupon>
  /** 获取优惠券列表 */
  fetchCouponList: (product_info?: string) => Promise<void>

  /** 用户信息 */
  userData: IUserData | null
  /** 获取用户信息 */
  fetchUserData: () => Promise<void>

  /** 交易记录 */
  tradeList: IObservableArray<ITradeDetail>
  /** 获取交易记录 */
  fetchTradeList: () => Promise<void>
}

class UserStore implements IUserStore {
  @observable.ref
  couponList: Array<ICoupon> = []

  @computed
  get openCouponList () {
    return this.couponList.filter(item => item.status === 1)
  }

  @computed
  get unCouponList () {
    return this.couponList.filter(item => item.status === 2)
  }

  @action
  async fetchCouponList (product_info?: string) {
    const param: { product_info?: string } = {}

    // 为了显示效果清空已有列表
    this.couponList = []

    if (product_info) {
      param.product_info = product_info
    }

    const resData = await userService.fetchCouponLit(param)

    runInAction(() => {
      this.couponList = resData.lists
    })
  }

  @observable.ref
  userData: IUserData | null = null

  async fetchUserData () {
    const resData = await userService.fetchUserData()

    runInAction(() => {
      this.userData = resData
    })
  }

  tradeList: IObservableArray<ITradeDetail> = observable([])

  async fetchTradeList () {
    const resData = await userService.fetchTradeList()

    runInAction(() => {
      this.tradeList.replace(resData.lists)
    })
  }
}

export default UserStore
