import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import classNames from 'classnames'
import _ from 'lodash'
import { ICoupon } from '@/interfaces/checkout'
import { AtAccordion } from 'taro-ui'
import transformPrice from '@/utils/transformPrice'
import './index.scss'

interface CouponCardProps {
  data: ICoupon
  onSelect?: (my_coupon_id: string) => void
}

interface State {
  openRule: boolean
}

/**
 * 优惠券
 */
@observer
class CouponCard extends Component<CouponCardProps, State> {
  static defaultProps = {
    data: { amount: 0 },
    onSelect: null
  }

  readonly state: State = { openRule: false }

  handSelected = () => {
    const { data, onSelect } = this.props

    onSelect && onSelect(data.my_coupon_id)
  }

  /** 控制规则列表的展开收起 */
  handleOpenRuleList = value => {
    this.setState({ openRule: value })
  }

  render () {
    const { data } = this.props

    return (
      <View className='couponCardWrap'>
        <View className={classNames('cardPriceWrap', { unavailable: data.status === 2 })} onClick={this.handSelected}>
          <View className='price'>
            <Text className='priceSub'>￥</Text>
            <Text>{transformPrice(data.amount, false)}</Text>
          </View>
        </View>
        <View className='cardInfoWrap'>
          <View className='info'>
            <View className='title' onClick={this.handSelected}>
              {data.name}
            </View>
            {data.status === 2 && <View className='warn'>该订单类型不可用</View>}
            <View className='mark' onClick={this.handSelected}>
              {data.start_date}~{data.end_date}
            </View>
          </View>
          <View className='divideLine' />
          <AtAccordion
            className='accordion'
            hasBorder={false}
            open={this.state.openRule}
            onClick={this.handleOpenRuleList}
            title='代金券使用规则'
          >
            <RichText nodes={data.comment} />
          </AtAccordion>
        </View>
      </View>
    )
  }
}

export default CouponCard
