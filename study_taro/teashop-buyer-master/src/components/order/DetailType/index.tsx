import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import _ from 'lodash'
import './index.scss'
import { IOrderDetail } from '@/interfaces/order'

interface OrderDetailTypeProps {
  data: IOrderDetail
}

/**
 * 列表详情页状态卡片组件
 */
@observer
class OrderDetailType extends Component<OrderDetailTypeProps> {
  render () {
    const { status, status_description, take_number } = (this.props.data || {}) as IOrderDetail

    return (
      <View className='orderTypeWrap'>
        <View className='type'>
          {status === 1 && <Text>已取消</Text>}
          {status === 2 && <Text>待付款</Text>}
          {status === 3 && <Text>已完成</Text>}
          {status === 4 && <Text>待接单</Text>}
          {status === 5 && <Text>制作中</Text>}
        </View>
        <View>{status_description}</View>

        {status !== 1 && status !== 2 &&
          <View className='orderNum'>
            <View className='num'>{take_number}号</View>
            <Text>凭号取餐</Text>
          </View>
        }
      </View>
    )
  }
}

export default OrderDetailType
