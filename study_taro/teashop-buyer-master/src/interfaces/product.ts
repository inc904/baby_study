/**
 * 产品基础数据
 */
interface ISimpleProduct {
  /** 单价 */
  price: number
  /** vip价格 */
  vip_price: number
  /** 销量 */
  sale_num: number
  /** 子标题 */
  sub_title: string
  /** 产品图 */
  thumb: string
  /** 产品名 */
  title: string
  /** 商品ID*/
  product_id: number
  /** sku数量 */
  sku_count: number
}

/**
 * 列表产品字段
 */
export interface ILiProductInfo extends ISimpleProduct {
  on_num: number
  /** 1有库存 2无库存 */
  no_stock: 1 | 2
  /** 最大够买数量 */
  max_buy_num: number
  /** 在购物车里是否有多个规格 1:是 2:否*/
  has_multi_standard: 1 | 2
  /** 已添加到购物车的数量 */
  added_cart_num: number
  /** 最后一次加入购物的商口SKU */
  last_added_product_sku: number
}

/**
 * 产品详情
 */
export interface IProductDetail extends ISimpleProduct {
  sku_count: number
  tips: string
  /** 购买状态 1：正常，2无库存 3商品已下架*/
  buy_status: 1 | 2 | 3
  /** 图片列表 */
  images: string[]
  /** 状态名称 */
  buy_status_text: string
  /** 长描述 */
  content?: string
}

/** 产品类目 */
export interface IProductCategory {
  name: string
  category_id: string
}

/** 产品SKU */
export interface ISkuData {
  product_sku: number
  price: number
  vip_price: number
  on_stock_num: number
  lists: Array<{
    standard_name: string
    standard_list: Array<{
      value: string
      image?: string
      selected: boolean
      is_exist: boolean
    }>
  }>
}

export interface ISkuSelected {
  [standard_name: string]: string | null
}
