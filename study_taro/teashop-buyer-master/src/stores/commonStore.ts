import { observable, action, runInAction } from 'mobx'
import { IBannerData } from '@/interfaces/common'
import indexService from '@/services/indexService'

export interface ICommonStore {
  cartBadge: number

  /** 店铺名称 */
  shopName: string

  /** 首页banner数据 */
  bannerList: IBannerData[] | null

  /** 注册弹窗控制 */
  isSignModalOpened: boolean

  /** 获取店铺公共数据 */
  fetchStoreData: () => Promise<void>
}

class CommonStore implements ICommonStore {
  @observable
  cartBadge = 0 // 购物车数量

  @observable
  isSignModalOpened = false

  @observable
  shopName = ''

  @observable.ref
  bannerList: IBannerData[] | null = null

  @action
  async fetchStoreData () {
    const resData = await indexService.fetchIndexData()

    runInAction(() => {
      this.shopName = resData.shop_name
      this.bannerList = resData.banner_lists
    })
  }
}

export default CommonStore
