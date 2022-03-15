import Taro, { Component, Config } from '@tarojs/taro'
import _ from 'lodash'
import { View, Text, Navigator, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { autorun, runInAction, action } from 'mobx'
import { ICommonStore } from '@/stores/commonStore'
import { AtButton } from 'taro-ui'
import userService from '@/services/userService'
import { IFriendDetail } from '@/interfaces/user'
import { DEF_REQUEST_CONFIG } from '@/src/config'
import UserSignModal from '@/components/user/SignInModal'
import '@/components/user/SignInModal/cover.scss'
import './index.scss'

/**
 * 路由参数
 */
interface RouterParams {
  /** 页面类型：分享或者领取 */
  page: 'share' | 'receive'
  /** 分享人Id */
  user_code: string
  shop_key: string
}

interface State {
  userCode: string
  friendList: IFriendDetail[]
  isModalOpened: boolean
  phone: string | null
  verifyCode: string | null
  sendTimer: number
  couponInfo: {
    is_received: 1 | 2 // 领取状态 1 已领取
    received_account: string // 领取帐号
    received_date: string // 领取时间
    coupon_name: string // 券名称
    shop_address: string // 门店地址
    rule_content: string // 规格内容
    /** 领取人 */
    user_lists: {
      nickname: string
      avatar: string
    }[]
  } | null
  /** 领取页状态 1 已领取  */
  receiveStatus: 1 | 2
}

interface InjectStoreProps {
  commonStore: ICommonStore
}

/**
 * 分享页面
 */
@inject('commonStore')
@observer
class ShareCouponPage extends Component<{}, State> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  readonly state: State = {
    userCode: '',
    friendList: [],
    isModalOpened: false,
    phone: null,
    verifyCode: null,
    sendTimer: 0,
    couponInfo: null,
    receiveStatus: 2
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '分享' }

  componentDidMount () {
    // 请求初始数据
    const { commonStore } = this.inject
    const { user_code, page } = this.$router.params as RouterParams

    autorun(() => {
      if (commonStore.shopName !== '') {
        Taro.setNavigationBarTitle({ title: `${commonStore.shopName}分享` })
      }
    })

    console.log('路由参数：', this.$router.params)

    if (page === 'receive') {
      // 查询优惠券信息
      userService.fetchShareCouponDetail({ user_code }).then(data => {
        // 更新数据
        this.setState({ couponInfo: data, friendList: data.user_lists, receiveStatus: data.is_received })
      })
    } else {
      // 直接获取已邀请好友列表
      userService.fetchShareFriendList().then(data => {
        this.setState({ friendList: data.lists, userCode: data.user_code })
      })
    }
  }

  @action
  componentWillUnmount () {
    this.inject.commonStore.isSignModalOpened = false
  }

  /**
   * 调用微信分享
   */
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    return {
      title: '分享标题',
      imageUrl: '分享图片',
      path: `/pages/user/share/index?user_code=${this.state.userCode}&shop_key=${DEF_REQUEST_CONFIG.shop_key}&page=receive`
    }
  }

  handleOpenModal = e => {
    // 判断是否已注册过
    Taro.login()
      .then(res => {
        console.log('微信Code: ', res.code)

        return userService.fetchUserAuth({ code: res.code })
      })
      .then(res => {
        // 判断用户已注册
        if (res.youhui_token) {
          // 改为登录状态
          Taro.setStorageSync('access_token', res.youhui_token)
          Taro.setStorageSync('weixin_token', res.weixin_token)

          // 直接获取coupon
          this.getCoupon()
        } else {
          console.log('打开注册modal')

          runInAction(() => {
            this.inject.commonStore.isSignModalOpened = true
          })
        }
      })
  }

  getCoupon = () => {
    // 领取优惠券
    userService
      .fetchCouponReceive({ user_code: this.$router.params.user_code })
      .then(() => {
        Taro.showToast({ title: '优惠券领取成功！', icon: 'none' })

        // 查询优惠券信息
        return userService.fetchShareCouponDetail({ user_code: this.$router.params.user_code })
      })
      .then(data => {
        // 更新数据
        this.setState({ couponInfo: data, friendList: data.user_lists, receiveStatus: data.is_received })
      })
      .catch(err => {
        if (err.code === 113000) {
          Taro.showToast({ title: err.message, icon: 'none' })
        }
      })
  }

  render () {
    const { couponInfo, receiveStatus } = this.state
    const { page } = this.$router.params as RouterParams

    return (
      <View className='sharePage'>
        {/* <View className='shareAdsWrap'>
          <View>好友请你</View>
          <View>免费喝奶茶啦!</View>
        </View>
        <View className='shareAds2Wrap'>
          <View>好朋友就要尝尝久久！</View>
        </View> */}
        {page === 'receive' ?
          <View className='shareActionWrap'>
            {receiveStatus === 1 && couponInfo &&
              <View className='couponWrap'>
                <View className='couponCard'>
                  <View className='left'>
                    <Text className='small'>X</Text>1
                  </View>
                  <View className='right'>
                    <View className='name'>{couponInfo.coupon_name}</View>
                    <View className='info'>领取日期：{couponInfo.received_date}</View>
                  </View>
                </View>
                <View className='couponInfo'>优惠券已发放至 {couponInfo.received_account}</View>
              </View>
            }
            {receiveStatus === 1 ?
              <Navigator url='/pages/store/index' openType='switchTab'>
                <AtButton type='primary' circle>
                  去使用吧
                </AtButton>
              </Navigator>
              :
              <AtButton openType='getUserInfo' onGetUserInfo={this.handleOpenModal} type='primary' circle>
                立即领取
              </AtButton>
            }
          </View>
          :
          <View className='shareActionWrap'>
            <AtButton openType='share' type='primary' circle>
              分享
            </AtButton>
          </View>
        }
        <View className='shareFriendWrap'>
          {/* <View className='title'>已邀请的好友</View> */}
          <View className='list'>
            {this.state.friendList.map(item =>
              <View key={item.nickname} className='friendItem'>
                <Image className='image' mode='aspectFill' src={item.avatar} />
              </View>)}
          </View>
        </View>
        <View className='shareInfoWrap'>
          {couponInfo && couponInfo.shop_address ? <View className='title'>门店地址：TBD云集中心久久奶茶</View> : ''}
        </View>
        <View className='shareFooterWrap'>
          <Navigator url=''>
            <Text>活动规则</Text>
          </Navigator>
        </View>
        <UserSignModal signDone={this.getCoupon} />
      </View>
    )
  }
}

export default ShareCouponPage
