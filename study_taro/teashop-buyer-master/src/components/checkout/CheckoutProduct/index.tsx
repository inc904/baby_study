import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import _ from 'lodash'
import './index.scss'
import { ISkuProduct } from '@/interfaces/checkout'
import transformPrice from '@/utils/transformPrice'

interface CheckoutProductProps {
  data: ISkuProduct[]
}

/**
 * 结算页产品列表
 */
@observer
class CheckoutProduct extends Component<CheckoutProductProps> {
  static defaultProps: CheckoutProductProps = { data: [] }

  render () {
    const { data } = this.props

    return (
      <View className='productListWrap'>
        {data.map((item, key) =>
          <View key={key} className='productCard'>
            <View className='cardImageWrap'>
              <Image mode='aspectFill' className='productImg' src={item.thumb} />
            </View>
            <View className='cardInfoWrap'>
              <View className='title'>{item.title}</View>
              <View className='sku'>{item.standard}</View>
              <View className='priceWrap'>
                <View className='price'>￥{transformPrice(item.price)}</View>
                <Text className='vipPrice'>{item.vip_price > 0 ? `￥${transformPrice(item.vip_price)}` : ''}</Text>
                {item.vip_price > 0 && <Text className='icon iconVip' />}
              </View>
            </View>
            <View className='cardNumWrap'>
              <Text className='num'>x{item.num}</Text>
            </View>
          </View>)}
      </View>
    )
  }
}

export default CheckoutProduct
