import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { View, Navigator } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IUserStore } from '@/stores/userStore'
import { AtButton } from 'taro-ui'
import orderService from '@/services/orderService'

interface InjectStoreProps {
  userStore: IUserStore
}

interface IRouterParams {
  type: 'success' | 'fail'
  order_number: string
}

interface IState {
  takeNumber: number
}

/**
 * 支付结果页
 */
@inject('userStore')
@observer
class CheckoutResultPage extends Component<{}, IState> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  readonly state: IState = { takeNumber: 0 }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '支付' }

  componentWillMount () {
    const { params } = this.$router as { params: IRouterParams }

    if (params.type === 'success') {
      Taro.setNavigationBarTitle({ title: '支付成功' })

      orderService.fetchOrderStatus({ order_number: params.order_number }).then(res => {
        this.setState({ takeNumber: res.take_number })
      })
    } else {
      Taro.setNavigationBarTitle({ title: '支付失败' })
    }
  }

  render () {
    const { params: { type }} = this.$router as { params: IRouterParams }
    const { takeNumber } = this.state

    return (
      <View className='checkoutResultPage'>
        {type === 'success' ?
          <View>
            <View className='checkoutResultCard'>
              <View className='typeImg success' />
              <View className='title'>支付成功</View>
              <View className='actionGroup'>
                <Navigator openType='switchTab' url='/pages/order/index'>
                  <AtButton>查看订单</AtButton>
                </Navigator>
                <Navigator openType='switchTab' url='/pages/store/index'>
                  <AtButton>返回首页</AtButton>
                </Navigator>
              </View>
            </View>
            <View className='checkoutResultCard'>
              <View className='title'>您的取餐号码</View>
              {takeNumber ? <View className='content'>{takeNumber}号</View> : ''}
            </View>
          </View>
          :
          <View>
            <View className='checkoutResultCard'>
              <View className='typeImg fail' />
              <View className='title'>支付失败</View>
              <View className='tips'>请您重新支付！</View>
              <View className='actionGroup'>
                <Navigator openType='switchTab' url='/pages/store/index'>
                  <AtButton>返回首页</AtButton>
                </Navigator>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}

export default CheckoutResultPage
