import { observable, action, runInAction, ObservableMap, computed } from 'mobx'
import _ from 'lodash'
import { IOrderLiDetail, IOrderDetail } from '@/interfaces/order'
import orderService from '@/services/orderService'

export interface IOrderStore {
  // 订单列表Id列表
  orderKeysList: string[]
  /** 订单列表 */
  orderList: ObservableMap<string, IOrderLiDetail>
  /** 订单数据是否已到最后一页 */
  orderListIsEnd: boolean
  /** 当前页 */
  currentPage: number
  /** 获取订单列表 */
  fetchOrderList: (page?: number) => Promise<void>

  /** 取消订单 */
  cancelOrder: (order_number: string, status: 1 | 2) => Promise<void>

  /** 订单详情 */
  orderDetail: IOrderDetail | null
  /** 获取订单详情 */
  fetchOrderDetail: (order_number: string) => Promise<void>
}

class OrderStore implements IOrderStore {
  @computed
  get orderKeysList () {
    return Array.from(this.orderList.keys())
  }

  orderList: ObservableMap<string, IOrderLiDetail> = observable.map()

  @observable
  orderListIsEnd = false

  @observable
  currentPage = 1

  @action
  async fetchOrderList (page: number = 1) {
    const resData = await orderService.fetchOrderList({ page, num: 20 })

    runInAction(() => {
      this.orderListIsEnd = resData.lists.length === 0
      this.currentPage = page

      if (page === 1) {
        this.orderList.replace(_.keyBy(resData.lists, 'order_number'))
      } else {
        this.orderList.merge(_.keyBy(resData.lists, 'order_number'))
      }
    })
  }

  @action
  async cancelOrder (order_number: string, status: 1 | 2) {
    const orderDetail = this.orderList.get(order_number) as IOrderLiDetail
    let orderInfo = {}

    try {
      if (status === 1) {
        orderInfo = await orderService.cancelNotPayOrder({ order_number })
      } else {
        orderInfo = await orderService.cancelPayOrder({ order_number })
      }

      runInAction(() => {
        // 将状态扭转
        // 合并后端返回的状态
        Object.assign(orderDetail, orderInfo)
      })
    } catch (err) {
      console.log(err)
    }
  }

  @observable
  orderDetail: IOrderDetail | null = null

  @action
  async fetchOrderDetail (order_number: string) {
    const resData = await orderService.fetchOrderDetail({ order_number })

    runInAction(() => {
      this.orderDetail = resData
    })
  }
}

export default OrderStore
