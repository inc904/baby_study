import Taro, { Component, Config } from '@tarojs/taro'
import _ from 'lodash'
import './index.scss'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IUserStore } from '@/stores/userStore'
import transformPrice from '@/utils/transformPrice'
import classNames from 'classnames'

interface InjectStoreProps {
  userStore: IUserStore
}

/**
 * 交易明细页
 */
@inject('userStore')
@observer
class TradeRecordPage extends Component<{}> {
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
  config: Config = { navigationBarTitleText: '交易明细' }

  componentDidMount () {
    this.inject.userStore.fetchTradeList()
  }

  render () {
    const { userStore: { tradeList }} = this.inject

    return (
      <View className='tradeRecordPage'>
        {tradeList.map((item, key) =>
          <View key={key} className='tradeItem'>
            <View className='itemLeft'>
              <View className='title'>{item.trade_type}</View>
              <View className='time'>{item.insert_date}</View>
            </View>
            <View className='itemRight'>
              <View
                className={classNames('itemContent', {
                  typePlus: item.operate_type === 1,
                  typeMinus: item.operate_type === 2
                })}
              >
                <Text>{item.operate_type === 1 ? '+' : '-'}</Text>
                <Text>{transformPrice(item.money)}</Text>
              </View>
            </View>
          </View>)}
      </View>
    )
  }
}

export default TradeRecordPage
