import { observable, action, runInAction, IObservableArray, computed, ObservableMap, decorate } from 'mobx'
import _ from 'lodash'
import orderService from '@/services/orderService'
import { ICartProduct, IPlaceOrderData } from '@/interfaces/checkout'

export interface ICartStore {
  /** 购物车数量 */
  cartNum: number
  /** 购物车数量tabBadge 是否更新成功 */
  updatedCartNum: boolean
  /** 商品总价 */
  sumMoney: number
  /** 全选状态 */
  checkedAll: boolean
  /** 选中商品 */
  checkList: IObservableArray<string>
  /** 选中商品数量 */
  checkNum: number
  /** 选中商品总价 */
  totalPrice: number

  /** 购物车产品Key列表 */
  cartProductKeyList: string[]
  cartProductData: ObservableMap<string, ICartProduct>
  /** 所有可选 */
  checkedKeys: string[]
  /** 获取购物车数量 */
  fetchCartNum: () => Promise<string>
  /** 获取购物车列表 */
  fetchCartProductData: () => Promise<void>

  /** 删除购物车产品 */
  delCartProductData: (key: string) => Promise<void>

  /** 修改数量 */
  setCartProductNum: (key: string, num: number) => Promise<void>

  placeOrderData: IPlaceOrderData | null
  /** 是否余额支付 */
  isBalancePay: boolean

  /** 确认订单信息 */
  fetchConfirmOrder: (coupon_id?: string) => Promise<void>

  /** 下单 */
  fetchPlaceOrder: () => Promise<{ order_number: string } | undefined>
}

class CartStore implements ICartStore {
  @observable
  cartNum = 0

  updatedCartNum = true

  @observable
  sumMoney = 0

  checkList: IObservableArray<string> = observable([])

  @computed
  get checkedAll () {
    return this.checkList.length === this.checkedKeys.length
  }

  @computed
  get cartProductKeyList () {
    return Array.from(this.cartProductData.keys())
  }
  // 初始值为空Map
  cartProductData: ObservableMap<string, ICartProduct> = observable.map({}, { deep: false })

  // 选中数量
  @computed
  get checkNum () {
    return _.reduce(
      this.checkList,
      (total, key) => {
        total += this.cartProductData.get(key)!.num

        return total
      },
      0
    )
  }

  // 选中价格
  @computed
  get totalPrice () {
    return _.reduce(
      this.checkList,
      (total, key) => {
        total += this.cartProductData.get(key)!.price * this.cartProductData.get(key)!.num

        return total
      },
      0
    )
  }

  @action
  async fetchCartNum () {
    const resData = await orderService.fetchCartNum()

    runInAction(() => {
      this.cartNum = parseInt(resData.num)
    })

    return Promise.resolve(resData.num)
  }

  @observable
  checkedKeys: string[] = []

  @action
  async fetchCartProductData () {
    const resData = await orderService.fetchCartList()
    const cartProductData = _.keyBy(resData.lists, item => {
      decorate(item, { num: observable })

      return item.product_id + '_' + item.product_sku
    })

    runInAction(() => {
      this.cartNum = resData.product_num
      this.sumMoney = resData.sum_money
      this.cartProductData.replace(cartProductData)
      this.checkedKeys = _.keys(_.pickBy(cartProductData, item => item.no_stock === 1))
      // 默认全选有库存的
      this.checkList.replace(this.checkedKeys)
    })
  }

  @action
  async delCartProductData (key) {
    const { product_id, product_sku } = this.cartProductData.get(key) as ICartProduct

    // 前端UI上删除
    this.checkList.remove(key)
    this.cartProductData.delete(key)

    // 接口删除
    return await orderService.setCartProductNum({ product_id, product_sku, num: 0 })
  }

  @action
  async setCartProductNum (key, num) {
    const thisItem = this.cartProductData.get(key) as ICartProduct

    thisItem.num = num

    return await orderService.setCartProductNum({
      product_id: thisItem.product_id,
      product_sku: thisItem.product_sku,
      num
    })
  }

  @observable
  placeOrderData: IPlaceOrderData | null = null

  @observable
  isBalancePay: boolean = true

  @action
  async fetchConfirmOrder (coupon_id = '') {
    const productInfo = this.checkList.map(key => {
      return {
        product_id: this.cartProductData.get(key)!.product_id,
        product_sku: this.cartProductData.get(key)!.product_sku,
        num: this.cartProductData.get(key)!.num
      }
    })

    const resData = await orderService.initPlaceOrder({
      product_info: JSON.stringify(productInfo),
      use_balance_payment: this.isBalancePay ? 1 : 2,
      coupon_id
    })

    runInAction(() => {
      this.placeOrderData = resData
      this.isBalancePay = resData.pay_balance_can_select === 1
    })
  }

  @action
  async fetchPlaceOrder () {
    if (this.placeOrderData) {
      const productInfo = this.placeOrderData.product_info.map(item => _.pick(item, ['product_id', 'product_sku', 'num']))

      // 支付结果数据
      return await orderService.confirmPlaceOrder({
        product_info: JSON.stringify(productInfo),
        pay_balance: this.placeOrderData.pay_balance,
        pay_money: this.placeOrderData.pay_money,
        use_balance_payment: this.placeOrderData.pay_balance_can_select,
        coupon_id: this.placeOrderData.coupon_id
      })
    }
  }
}

export default CartStore
