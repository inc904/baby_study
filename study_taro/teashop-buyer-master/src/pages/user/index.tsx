import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Navigator, OpenData, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IUserStore } from '@/stores/userStore'
import { ICommonStore } from '@/stores/commonStore'
import transformPrice from '@/utils/transformPrice'
import UserSignModal from '@/components/user/SignInModal'
import '@/components/user/SignInModal/cover.scss'
import './index.scss'
import { action, runInAction } from 'mobx'

interface InjectStoreProps {
  userStore: IUserStore
  commonStore: ICommonStore
}

@inject('userStore', 'commonStore')
@observer
class UserPage extends Component<{}> {
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
  config: Config = { navigationBarTitleText: '我的' }

  // componentDidShow () {
  //   // 自定义tarbar
  //   // 当前页面对应的 index
  //   this.$scope.getTabBar().setData({ selected: 3 })
  // }

  // @action
  // componentWillMount () {
  //   const accessToken = Taro.getStorageSync('access_token')

  //   console.log(!!accessToken)
  //   if (!!accessToken) {
  //     this.inject.userStore.fetchUserData()
  //   } else {
  //     // 弹出注册
  //     this.inject.commonStore.isSignModalOpened = true
  //   }
  // }

  @action
  componentDidShow () {
    const accessToken = Taro.getStorageSync('access_token')

    if (accessToken) {
      this.inject.userStore.fetchUserData().catch(err => {
        if (err.code === 401) {
          runInAction(() => {
            this.inject.commonStore.isSignModalOpened = true
          })
        }
      })
      this.inject.commonStore.isSignModalOpened = false
    } else if (!this.inject.commonStore.isSignModalOpened) {
      setTimeout(() => {
        Taro.getApp().signPageData = { redirectPage: 'pages/user/index' }

        // 弹出注册
        runInAction(() => {
          this.inject.commonStore.isSignModalOpened = true
        })
      }, 100)
    }
  }

  @action
  componentWillUnmount () {
    this.inject.commonStore.isSignModalOpened = false
  }

  /**
   * 注册成功
   */
  handleSignDone = () => {
    Taro.showToast({ title: '注册成功', icon: 'none' })

    this.inject.userStore.fetchUserData()
  }

  render () {
    const { userStore: { userData }} = this.inject

    return (
      <View className='userPage'>
        <View className='userInfoWrap'>
          <View className='userLogo'>
            <OpenData type='userAvatarUrl' />
          </View>
          <View className='userInfo'>
            <View className='userName'>
              <OpenData lang='zh_CN' type='userNickName' />
            </View>
            <View className='userTag'>{userData && userData.is_vip === 1 && <Text className='icon iocnVip' />}</View>
          </View>
        </View>
        <View className='accountInfoWrap'>
          <Navigator url='/pages/user/recharge/index' className='accountItem'>
            <View className='key'>余额</View>
            <View className='item'>￥{userData ? transformPrice(userData.money) : 0}</View>
          </Navigator>
          <Navigator url='/pages/user/coupon/index' className='accountItem'>
            <View className='key'>优惠券</View>
            <View className='item'>{userData ? userData.coupon_num : 0}</View>
          </Navigator>
          <Navigator url='/pages/user/activity/index' className='accountItem'>
            <View className='key'>VIP会员</View>
            <View className='item'>{userData && userData.is_vip === 1 ? <Text>已开通</Text> : <Text>充值开通</Text>}</View>
          </Navigator>
        </View>
        <View className='bannerWrap'>
          <Swiper className='bannerSwiperWrap' previousMargin='20rpx' next-margin='20rpx'>
            {userData &&
              userData.banner_lists.map((item, index) =>
                <SwiperItem key={index}>
                  {item.action === 'h5' ?
                    <View className='swiperItemView'>
                      <Navigator className='aBox' url={`/pages/common/outurl/index?title=${item.params.title}&src=${item.params.url}`}>
                        <Image mode='aspectFill' className='image' src={item.image} />
                      </Navigator>
                    </View>
                    :
                    <View className='swiperItemView'>
                      <Image mode='aspectFill' className='image' src={item.image} />
                    </View>
                  }
                </SwiperItem>)}
          </Swiper>
        </View>
        <View className='navItemWrap'>
          <Navigator className='navItem' url='/pages/user/recharge/index'>
            <View className='img'>
              <Text className='icon iconNavRecharge' />
            </View>
            <View className='title'>账号充值</View>
            <View className='tips'>冲99送21终身享7折</View>
            <Text className='icon iconArrowRight' />
          </Navigator>
          {/* <Navigator className='navItem' openType='switchTab' url='/pages/order/index'>
            <View className='img'>
              <Text className='icon iconNavOrder' />
            </View>
            <View className='title'>我的订单</View>
            <View className='tips' />
            <Text className='icon iconArrowRight' />
          </Navigator> */}
          <Navigator className='navItem' url='/pages/user/share/index'>
            <View className='img'>
              <Text className='icon iconNavShare' />
            </View>
            <View className='title'>分享好友</View>
            <View className='tips'>邀请好友免费喝奶茶</View>
            <Text className='icon iconArrowRight' />
          </Navigator>
          <Navigator className='navItem' url='/pages/user/about/index'>
            <View className='img'>
              <Text className='icon iconNavAbout' />
            </View>
            <View className='title'>关于</View>
            <View className='tips' />
            <Text className='icon iconArrowRight' />
          </Navigator>
        </View>
        <UserSignModal signDone={this.handleSignDone} />
      </View>
    )
  }
}

export default UserPage
