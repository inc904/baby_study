import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IUserStore } from '@/stores/userStore'

interface InjectStoreProps {
  userStore: IUserStore
}

/**
 * 关于我们 页面
 */
@inject('userStore')
@observer
class AboutUsPage extends Component<{}> {
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
  config: Config = { navigationBarTitleText: '关于' }

  render () {
    return (
      <View className='aboutPage'>
        <View className='aboutItem'>
          <View className='title'>版本信息</View>
          <View className='value'>v1.1.1</View>
        </View>
      </View>
    )
  }
}

export default AboutUsPage
