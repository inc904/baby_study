export interface ISkuProduct {
  /** 商品ID */
  product_id: number
  /** sku ID */
  product_sku: number
  /** 商品标题 */
  title: string
  /** 商品缩略图地址 */
  thumb: string
  /** sku info */
  standard: string
  /** 已买数量 */
  num: number
  /** 单价, 单位分 */
  price: number
  /** VIP价格 */
  vip_price: number
}

/**
 * 购物车产品详情
 */
export interface ICartProduct extends ISkuProduct {
  min_buy_num: number
  max_buy_num: number
  /** 是否有库存 1 有 2 没有*/
  no_stock: number
}

/**
 * 结算页详情
 */
export interface IPlaceOrderData {
  product_info: ISkuProduct[]
  /** 商品总额 */
  sum_money: number
  /** 商品券Id */
  coupon_id: string
  /** 商品券信息 */
  coupon_text: string
  /** 余额支付金额，单位分 */
  pay_balance: number
  /** 余额支付文本提示信息 */
  pay_balance_text: string
  /** 余额支付是否可选 1禁用，2不禁用 */
  pay_balance_disabled: 1 | 2
  /** 是否使用余额支付，1：使用，2：没有使用 */
  pay_balance_can_select: 1 | 2
  pay_money: number
  /** 实际付款信息，单位分 */
  settlement_amount: number
}

/**
 * 优惠券
 */
export interface ICoupon {
  /** 优惠券ID */
  my_coupon_id: string
  /** 券名称 */
  name: string
  /** 备注 */
  comment: string
  /** 可用金额，单位分 */
  amount: number

  /** 有效时间 */
  start_date: string
  /** 有效时间 */
  end_date: string

  /** 1可以，2：不可用 */
  status: 1 | 2
}
