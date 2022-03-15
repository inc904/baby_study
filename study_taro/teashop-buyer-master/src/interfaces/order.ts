export interface IOrderLiDetail {
  /** 订单号 */
  order_number: string
  /** 商品总额 单位分 */
  sum_money: number
  product_lists: { thumb: string }[]
  /** 总数量 */
  total_num: number
  /** 1:已取消 2:待付款 3:已完成 4:待接单 5:制作中 */
  status: 1 | 2 | 3 | 4 | 5
  /** 状态名称 */
  status_name: string
  /** 按钮事件  cancel_no_payment_order:取消未支付 cancel_payment_order:取消已支付 pay:支付 view_detail:查看详情 */
  events: ('view_detail' | 'pay' | 'cancel_no_payment_order' | 'cancel_payment_order')[]
  /** 订单时间 */
  insert_date: string
}

export interface IOrderDetail {
  /** 订单号 */
  order_number: string
  /** 商品总额 单位分 */
  sum_money: number
  /** 1:已取消 2:待付款 3:已完成 4:待接单 5:制作中 */
  status: 1 | 2 | 3 | 4 | 5
  /** 状态名称 */
  status_name: string
  /** 订单时间 */
  insert_date: string

  /** 三方支付金额,单位分，如微信支付。0不显示 */
  pay_money: number
  /** 余额支付金额，单位分 */
  pay_balance: number
  /** 优惠金额，单位分 */
  offer_money: number
  /** 取餐号 */
  take_number: string
  products: {
    /** 商品ID */
    product_id: number
    /** 商品单价，单位分 */
    price: number
    /** 商品SKU */
    product_sku: string
    /** 数量 */
    num: number
    /** 标题 */
    title: string
  }[]
  /** 状态备注 */
  status_description: string

  /** 门店信息 */
  shop_info: {
    shop_name: string
    shop_address: string
    phone: string
  }
}
