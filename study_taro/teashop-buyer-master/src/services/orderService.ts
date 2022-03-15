import requestData from '@/utils/requestData'
import { ICartProduct, IPlaceOrderData } from '@/interfaces/checkout'
import { IOrderLiDetail, IOrderDetail } from '@/interfaces/order'

/**
 * 对应后端订单和购物车相关 API
 */
class OrderService {
  /**
   * 获取购物车数量
   */
  fetchCartNum (): Promise<{ num: string }> {
    return requestData({
      method: 'POST',
      api: 'storex/order/cart/get_num'
    })
  }

  /**
   * 获取购物车数量
   */
  fetchCartList (): Promise<{ product_num: number; sum_money: number; lists: ICartProduct[] }> {
    return requestData({
      method: 'POST',
      api: 'storex/order/cart/lists'
    })
  }

  /**
   * 添加购物车
   */
  addProductToCart (params: { product_id: number; num: number; product_sku?: number }): Promise<void> {
    return requestData({
      method: 'POST',
      api: 'storex/order/cart/add',
      params
    })
  }

  /**
   * 设置购物车产品
   */
  setCartProductNum (params: { product_id: number; num: number; product_sku: number | 0 }): Promise<void> {
    return requestData({
      method: 'POST',
      api: 'storex/order/cart/set',
      params
    })
  }

  /**
   * 删除购物车产品
   */
  delCartProduct (params: { product_id: number; product_sku: number }): Promise<void> {
    return requestData({
      method: 'POST',
      api: 'storex/order/cart/remove',
      params
    })
  }

  /**
   * 确认结算信息
   * @param {Object} params
   * @param {string} params.product_info 产品信息，JSON 字段串 [{"product_id": 1, "product_sku": 0, "num": 2}]
   */
  initPlaceOrder (params: { product_info: string; use_balance_payment: 1 | 2; coupon_id: string }): Promise<IPlaceOrderData> {
    return requestData({
      method: 'POST',
      api: 'storex/order/order/confirm',
      params
    })
  }

  /**
   * 生成订单
   * @param {Object} params
   * @param {string} params.product_info 产品信息，JSON 字段串 [{"product_id": 1, "product_sku": 0, "num": 2}]
   * @param {string} params.use_balance_payment 是否使用余额支付 1:使用， 2:不使用（默认值）
   * @param {number} params.pay_balance 余额支付（上一接口获取，用于校验），单位分
   * @param {number} params.pay_money 支付金额（上一接口获取，用于校验），单位分
   * @param {string=} params.comment 备注
   * @param {string} params.coupon_id 优惠券ID号 默认为空
   */
  confirmPlaceOrder (params: {
  product_info: string
  use_balance_payment: 1 | 2
  pay_balance: number
  pay_money: number
  coupon_id: string
  comment?: string
  }): Promise<{ order_number: string }> {
    return requestData({
      method: 'POST',
      api: 'storex/order/order/submit',
      params
    })
  }

  /**
   * 获取订单状态
   */
  fetchOrderStatus (params: {
  order_number: string
  }): Promise<{
    order_number: string
    /** 支付状态 1:已支付，2:未支付 */
    pay_status: 1 | 2
    /** 取餐号码 */
    take_number: number
    }> {
    return requestData({
      method: 'POST',
      api: 'storex/order/order/get_pay_status',
      params
    })
  }

  /**
   * 订单列表
   */
  fetchOrderList (params: { page: number; num: number }): Promise<{ lists: IOrderLiDetail[]; count?: number }> {
    return requestData({
      method: 'POST',
      api: 'storex/order/order/my_lists',
      params
    })
  }

  /**
   * 取消未支付订单
   */
  cancelNotPayOrder (params: { order_number: string }): Promise<any> {
    return requestData({
      method: 'POST',
      api: 'storex/order/order/cancel_no_payment_order',
      params
    })
  }

  /**
   * 取消支付订单
   */
  cancelPayOrder (params: { order_number: string }): Promise<any> {
    return requestData({
      method: 'POST',
      api: 'storex/order/order/cancel_payment_order',
      params
    })
  }

  /**
   * 获取订单详情
   */
  fetchOrderDetail (params: { order_number: string }): Promise<IOrderDetail> {
    return requestData({
      method: 'POST',
      api: 'storex/order/order/get_info',
      params
    })
  }
}

export default new OrderService()
