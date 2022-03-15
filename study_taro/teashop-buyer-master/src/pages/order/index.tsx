import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IOrderStore } from '@/stores/orderStore'

import './index.scss'
import OrderCard from '@/components/order/OrderCard'

interface InjectStoreProps {
  orderStore: IOrderStore
}

@inject('orderStore')
@observer
class OrderPage extends Component<{}> {
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
  config: Config = { navigationBarTitleText: '订单' }

  // componentDidShow () {
  //   // 自定义tarbar
  //   // 当前页面对应的 index
  //   this.$scope.getTabBar().setData({ selected: 2 })
  // }

  componentDidShow () {
    // 每次进入都更新数据
    this.inject.orderStore.fetchOrderList()
  }

  /**
   * 监听用户上拉触底事件
   * 触底加载新数据
   */
  onReachBottom () {
    const { orderStore: { fetchOrderList, orderListIsEnd, currentPage }} = this.inject

    if (!orderListIsEnd) {
      // 加载下一页内容
      fetchOrderList(currentPage + 1)
    }
  }

  render () {
    const { orderStore: { orderKeysList, orderListIsEnd }} = this.inject

    return orderKeysList.length > 0 ?
      <View className='orderPage'>
        {orderKeysList.map(order_number =>
          <OrderCard key={order_number} order_number={order_number} />)}
        {!orderListIsEnd &&
          <View className='orderListLoading'>
            <Text className='icon icon-loading rotateAni' />
          </View>
        }
      </View>
      :
      <View className='orderPage'>
        <View className='emptyImg' />
        <View className='emptyText'>现在还是空空如也~</View>
      </View>
  }
}

export default OrderPage
