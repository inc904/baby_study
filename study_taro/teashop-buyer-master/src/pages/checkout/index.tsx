import Taro, { Component, Config } from '@tarojs/taro'
import _ from 'lodash'
import { View, Text, Navigator } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtCheckbox, AtButton } from 'taro-ui'
import { toJS, action } from 'mobx'
import { ICartStore } from '@/stores/cartStore'
import CheckoutProduct from '@/components/checkout/CheckoutProduct'
import './index.scss'
import transformPrice from '@/utils/transformPrice'

interface InjectStoreProps {
  cartStore: ICartStore
}

/**
 * 订单结算页
 */
@inject('cartStore')
@observer
class CheckoutPage extends Component<{}> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '订单结算' }

  componentDidMount () {
    // 请求后端
    // Todo
    this.inject.cartStore.fetchConfirmOrder()
  }

  /**
   * 处理是否使用余额支付
   */
  @action
  handlePayBalance = value => {
    const isBalance = !!~value.indexOf('balance')

    this.inject.cartStore.isBalancePay = isBalance
    // 请求后端
    this.inject.cartStore.fetchConfirmOrder()
  }

  handleConfirmOrder = () => {
    const { cartStore } = this.inject

    cartStore.fetchPlaceOrder().then(res => {
      // 更新购物车数量
      cartStore.fetchCartNum()

      // 下单成功，进入支付流程
      // ....
      // pay_money === 0 无须微信支付
      if (cartStore.placeOrderData!.pay_money === 0) {
        // 关闭当前页面, 进入支付结果页
        res && Taro.redirectTo({ url: '/pages/checkout/result/index?type=success&order_number=' + res.order_number })
      }
    })
  }

  render () {
    const { cartStore: { placeOrderData, isBalancePay }} = this.inject

    return (
      placeOrderData &&
        <View className='checkoutPage'>
          <CheckoutProduct data={placeOrderData.product_info} />
          <View className='checkoutCard'>
            <View className='row totalPrice'>
              <Text>商品总价</Text>
              <Text className='price'>￥{transformPrice(placeOrderData.sum_money)}</Text>
            </View>
            <View className='row coupon'>
              <Text>优惠券</Text>
              <View>
                <Navigator
                  url={`/pages/user/coupon/index?product_info=${JSON.stringify(
                    placeOrderData.product_info.map(item => _.pick(item, ['product_id', 'product_sku', 'num']))
                  )}`}
                >
                  <Text className='text'>{placeOrderData.coupon_text}</Text>
                  <Text> ></Text>
                </Navigator>
              </View>
            </View>
            <View className='payPrice'>
              <Text>￥{transformPrice(placeOrderData.settlement_amount)}</Text>
            </View>
          </View>
          <View className='checkoutCard' onClick={this.handlePayBalance.bind(this, isBalancePay ? [] : ['balance'])}>
            <View className='balance'>
              <View>余额支付</View>
              <View className='action'>
                <Text>{placeOrderData.pay_balance_text}</Text>
                <AtCheckbox
                  options={[{ value: 'balance', label: '', disabled: placeOrderData.pay_balance_disabled === 1 }]}
                  onChange={this.handlePayBalance}
                  selectedList={isBalancePay ? ['balance'] : []}
                />
              </View>
            </View>
          </View>
          <View className='checkoutBottomMenu'>
            <View className='priceWrap'>
              <Text>还需支付: </Text>
              <Text className='price'>￥{transformPrice(placeOrderData.pay_money)}</Text>
            </View>
            <View className='btnWrap'>
              <AtButton type='primary' onClick={this.handleConfirmOrder}>
                去结算({toJS(placeOrderData.product_info).length})
              </AtButton>
            </View>
          </View>
        </View>

    )
  }
}

export default CheckoutPage
