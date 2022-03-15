import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import { IOrderStore } from '@/stores/orderStore'
import OrderDetailType from '@/components/order/DetailType'
import transformPrice from '@/utils/transformPrice'

interface InjectStoreProps {
  orderStore: IOrderStore
}

/**
 * 订单详情页
 */
@inject('orderStore')
@observer
class OrderDetailPage extends Component<{}> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '订单详情' }

  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  componentDidMount () {
    const order_number = this.$router.params.order_number

    // 请求订单详情
    this.inject.orderStore.fetchOrderDetail(order_number)
  }

  /**
   * 拨打电话
   */
  handkeCallPhone (phoneNumber: string) {
    Taro.makePhoneCall({ phoneNumber })
  }

  render () {
    const { orderDetail } = this.inject.orderStore
    const pay_money = orderDetail && orderDetail.pay_money || 0

    return (
      <View className='orderDetailPage'>
        <View className='orderDetailSection'>
          {orderDetail ? <OrderDetailType data={orderDetail} /> : <View className='typeSkeleton' />}
        </View>
        <View className='orderDetailSection'>
          {orderDetail && orderDetail.shop_info ?
            <View className='orderDetailStore'>
              <View className='left'>
                <View className='title store'>{orderDetail.shop_info.shop_name}</View>
                <View className='address'>{orderDetail.shop_info.shop_address}</View>
              </View>
              <View className='right'>
                <Text onClick={this.handkeCallPhone.bind(this, orderDetail.shop_info.phone)} className='icon iconTel' />
              </View>
            </View>
            :
            <View className='storeSkeleton' />
          }
        </View>
        <View className='orderDetailSection'>
          {orderDetail ?
            <View className='orderDetailProduct'>
              <View className='title'>商品明细</View>
              <View className='list'>
                {orderDetail.products &&
                  orderDetail.products.map(item =>
                    <View className='item' key={item.product_id + '_' + item.product_sku}>
                      <View className='col1'>{item.title}</View>
                      <View className='col2'>x{item.num}</View>
                      <View className='col3'>￥{transformPrice(item.price)}</View>
                    </View>)}
              </View>
            </View>
            :
            <View className='productSkeleton' />
          }
        </View>
        <View className='orderDetailSection'>
          {orderDetail ?
            <View className='orderDetailCheck'>
              {pay_money > 0 &&
                <View className='row'>
                  <View className='col1'>微信支付</View>
                  <View className='col2'>￥{transformPrice(orderDetail.pay_money)}</View>
                </View>
              }
              <View className='row'>
                <View className='col1'>余额支付</View>
                <View className='col2'>￥{transformPrice(orderDetail.pay_balance)}</View>
              </View>
              <View className='row'>
                <View className='col1'>优惠</View>
                <View className='col2'>￥{transformPrice(orderDetail.offer_money)}</View>
              </View>
              <View className='bottom'>
                <Text>合计：</Text>
                <Text className='price'>￥{transformPrice(orderDetail.sum_money)}</Text>
              </View>
            </View>
            :
            <View className='checkSkeleton' />
          }
        </View>
        <View className='orderDetailSection'>
          {orderDetail ?
            <View className='orderDetailInfo'>
              <View className='row'>
                <Text className='col1'>订单编号：</Text>
                <Text className='col2'>{orderDetail.order_number}</Text>
              </View>
              <View className='row'>
                <View className='col1'>下单时间：</View>
                <View className='col2'>{orderDetail.insert_date}</View>
              </View>
            </View>
            :
            <View className='infoSkeleton' />
          }
        </View>
      </View>
    )
  }
}

export default OrderDetailPage
