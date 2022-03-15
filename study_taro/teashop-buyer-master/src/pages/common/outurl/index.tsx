import Taro, { Component, Config } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

interface State {
  src: string | null
}

/**
 * h5外链页
 * 可打开关联的公众号的文章，其它网页需登录小程序管理后台配置业务域名。
 */
class ProductPage extends Component<{}, State> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '' }

  readonly state: State = { src: null }

  componentDidMount () {
    const { src, title = '' } = this.$router.params

    this.setState({ src })
    Taro.setNavigationBarTitle({ title })
  }

  render () {
    return this.state.src ? <WebView src={this.state.src} /> : <View />
  }
}

export default ProductPage
