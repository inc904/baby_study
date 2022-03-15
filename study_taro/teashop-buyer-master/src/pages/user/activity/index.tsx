import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { View, Navigator } from '@tarojs/components'
import { IUserStore } from '@/stores/userStore'
import { AtButton } from 'taro-ui'

interface InjectStoreProps {
  userStore: IUserStore
}

/**
 * 活动页面
 */
class ActivityPage extends Component<{}> {
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
  config: Config = { navigationBarTitleText: '充值' }

  render () {
    return (
      <View className='activityPage'>
        {/* <View className='activityAdsWrap'>
          <Text className='type1'>VIP会员尽享</Text>
          <Text className='type2'>七折</Text>
          <Text className='type1'>优惠</Text>
        </View>
        <View className='activityAdsWrap'>
          <Text className='type1'>再送</Text>
          <Text className='type2'>99杯</Text>
          <Text className='type1'>好友奶茶券</Text>
        </View>
        <View className='activityAdsWrap'>
          <Text className='type3'>快邀好友一起来吧！</Text>
        </View> */}
        <View className='activityBtnWrap'>
          <Navigator url='/pages/user/recharge/index' openType='redirect'>
            <AtButton type='primary' circle>
              去充值
            </AtButton>
          </Navigator>
        </View>
      </View>
    )
  }
}

export default ActivityPage
