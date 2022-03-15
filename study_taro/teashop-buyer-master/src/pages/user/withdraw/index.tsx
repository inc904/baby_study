import Taro, { Component, Config } from '@tarojs/taro'
import './index.scss'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IUserStore } from '@/stores/userStore'
import transformPrice from '@/utils/transformPrice'
import { autorun } from 'mobx'

interface InjectStoreProps {
  userStore: IUserStore
}

interface IState {
  imgPath: string
}

/**
 * 提现页面
 */
@inject('userStore')
@observer
class WithdrawPage extends Component<{}, IState> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  readonly state: IState = { imgPath: '' }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: 'APP下载' }

  componentDidMount () {
    const { userData } = this.inject.userStore

    autorun(() => {
      if (userData && userData.app_download_code) {
        Taro.getImageInfo({ src: userData.app_download_code }).then(res => {
          this.setState({ imgPath: res.path })
        })
      }
    })
  }

  /**
   * 长按保存图片到本地
   */
  handleSaveImage = () => {
    Taro.saveImageToPhotosAlbum({ filePath: this.state.imgPath }).then(() => {
      Taro.showToast({ title: '保存成功', icon: 'none' })
    })
  }

  render () {
    const { userData } = this.inject.userStore
    const { imgPath } = this.state

    return (
      <View className='withdrawPage'>
        <View className='withdrawInfoWrap'>
          <View className='title'>可提现金额</View>
          <View className='content'>
            <Text>{userData ? transformPrice(userData.withdrawable_cash) : transformPrice(0)}</Text>
            <Text className='unit'>元</Text>
          </View>
        </View>
        <View className='withdrawBtnWrap'>
          {/* <AtButton type='primary' circle>
            APP下载
          </AtButton> */}
          <View className='codeImg'>
            {imgPath && <Image mode='aspectFill' className='productImg' onLongPress={this.handleSaveImage} src={imgPath} />}
          </View>
          <View>长按保存二维码</View>
        </View>
      </View>
    )
  }
}

export default WithdrawPage
