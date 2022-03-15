import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IUserStore } from '@/stores/userStore'
import transformPrice from '@/utils/transformPrice'
import classNames from 'classnames'
import { AtButton, AtInput } from 'taro-ui'
import './index.scss'

interface InjectStoreProps {
  userStore: IUserStore
}

interface State {
  /** 充值选项 */
  rechargeCate: number
  /** 充值金额 */
  rechargeNum: number | null
}

/**
 * 账户充值页面
 */
@inject('userStore')
@observer
class RechargePage extends Component<{}, State> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  readonly state: State = { rechargeCate: 1, rechargeNum: null }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '账户充值' }

  componentDidMount () {
    if (this.inject.userStore.userData === null) {
      this.inject.userStore.fetchUserData()
    }
  }
  /**
   * 切换充值额度
   */
  handleChangeCate = (rechargeCate: number) => {
    if (rechargeCate !== this.state.rechargeCate) {
      if (rechargeCate === 1) {
        this.setState({ rechargeCate, rechargeNum: null })
      } else {
        this.setState({ rechargeCate })
      }
    }
  }

  /**
   * 修改充值金额
   */
  handleChangeRechargeNum = value => {
    this.setState({ rechargeNum: parseFloat(value) })
  }

  /**
   * 去充值
   */
  handleRecharge = () => {
    if (this.state.rechargeCate === 1) {
      console.log(99)
    } else {
      // 校验输入
      if (!this.state.rechargeNum || this.state.rechargeNum <= 0) {
        Taro.showToast({ title: '请输入您的充值金额！', icon: 'none' })

        return false
      }
      console.log(this.state.rechargeNum)
    }
  }

  render () {
    const { userStore: { userData }} = this.inject
    const { rechargeCate, rechargeNum } = this.state

    return (
      <View className='rechargePage'>
        <View className='topCardWrap'>
          <View className='title'>账户余额</View>
          <View className='value'>￥{userData ? transformPrice(userData.money) : transformPrice(0)}</View>
        </View>

        <View className='contentWrap'>
          <View className='cateWrap'>
            <View onClick={this.handleChangeCate.bind(this, 1)} className={classNames('cateItem', { selected: rechargeCate === 1 })}>
              <View className='title'>99元</View>
              <View className='value'>送21元</View>
            </View>
            <View onClick={this.handleChangeCate.bind(this, 2)} className={classNames('cateItem', { selected: rechargeCate === 2 })}>
              <AtInput
                onChange={this.handleChangeRechargeNum}
                name='rechargeNum'
                type='number'
                value={rechargeNum || undefined}
                placeholder='其他金额'
                placeholderStyle='color:#666'
              />
              <View className='value'>超或等于99元送21元</View>
            </View>
          </View>
          <View className='btnWrap'>
            <AtButton onClick={this.handleRecharge} type='primary'>
              去充值(到账{rechargeNum ? rechargeNum >= 99 ? rechargeNum + 21 : rechargeNum : 120}元)
            </AtButton>
          </View>
        </View>
        <View className='navItemWrap'>
          <Navigator className='navItem' url='/pages/user/trade_record/index'>
            <View className='img'>
              <Text className='icon iconNavList' />
            </View>
            <View className='title'>交易明细</View>
            <Text className='icon iconArrowRight' />
          </Navigator>
          <Navigator className='navItem' url='/pages/user/withdraw/index'>
            <View className='img'>
              <Text className='icon iconNavWithDraw' />
            </View>
            <View className='title'>可提现金额</View>
            <Text className='icon iconArrowRight' />
          </Navigator>
        </View>
      </View>
    )
  }
}

export default RechargePage
