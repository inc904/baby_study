import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import _ from 'lodash'
import { AtButton } from 'taro-ui'
import { IOrderStore } from '@/stores/orderStore'
import './index.scss'
import transformPrice from '@/utils/transformPrice'
import { IOrderLiDetail } from '@/interfaces/order'

interface OrderCardProps {
  order_number: string
}

interface InjectStoreProps extends OrderCardProps {
  orderStore: IOrderStore
}

/**
 * 列表页订单卡片组件
 */
@inject('orderStore')
@observer
class OrderCard extends Component<OrderCardProps> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  /**
   * 取消订单
   */
  handleCancelOrder = (status: 1 | 2) => {
    Taro.showModal({
      title: '取消订单',
      content: '你确定要取消本订单吗？',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定取消订单')
          this.inject.orderStore.cancelOrder(this.props.order_number, status)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  /**
   * 订单详情
   */
  handleNavToDetail = () => {
    // 预加载数据
    this.inject.orderStore.fetchOrderDetail(this.props.order_number)

    Taro.navigateTo({ url: `/pages/order/detail/index?order_number=${this.props.order_number}` })
  }

  /**
   * 去支付
   */
  handlePayOrder = () => {
    // 调用支付
    console.log(this.props.order_number)

    // 支付成功去到详情页
    Taro.navigateTo({ url: `/pages/order/detail/index?order_number=${this.props.order_number}` })
  }

  render () {
    const orderDetail = (this.inject.orderStore.orderList.get(this.props.order_number) || {}) as IOrderLiDetail

    if (!orderDetail) {
      return <View className='orderCardWrap' />
    }

    const { insert_date, status, status_name, product_lists, sum_money, total_num, events = [] } = orderDetail

    return (
      <View className='orderCardWrap'>
        <View className='cardTop'>
          <View>{insert_date}</View>
          <View className={'orderStatus ' + `orderStatus-${status}`}>{status_name}</View>
        </View>
        <View className='cardMain' onClick={this.handleNavToDetail}>
          <View className='orderProduct'>
            {product_lists.map(item =>
              <Image mode='aspectFill' key={item.thumb} className='orderProduct-img' src={item.thumb} />)}
          </View>
          <View className='orderBilling'>
            <View className='orderPrice'>￥{transformPrice(sum_money)}</View>
            <View className='orderNum'>共{total_num}件</View>
          </View>
        </View>
        <View className='cardAction'>
          {!!~events.indexOf('cancel_no_payment_order') &&
            <AtButton size='small' onClick={this.handleCancelOrder.bind(this, 1)}>
              取消
            </AtButton>
          }
          {!!~events.indexOf('cancel_payment_order') &&
            <AtButton size='small' onClick={this.handleCancelOrder.bind(this, 2)}>
              取消
            </AtButton>
          }
          {!!~events.indexOf('view_detail') &&
            <AtButton size='small' onClick={this.handleNavToDetail}>
              查看详情
            </AtButton>
          }
          {!!~events.indexOf('pay') &&
            <AtButton size='small' onClick={this.handlePayOrder} type='primary'>
              立即支付
            </AtButton>
          }
        </View>
      </View>
    )
  }
}

export default OrderCard
