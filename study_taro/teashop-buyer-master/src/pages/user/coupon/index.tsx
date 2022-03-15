import Taro, { Component, Config } from '@tarojs/taro'
import _ from 'lodash'
import './index.scss'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { ICartStore } from '@/stores/cartStore'
import { IUserStore } from '@/stores/userStore'
import CouponCard from '@/components/user/CouponCard'

interface InjectStoreProps {
  cartStore: ICartStore
  userStore: IUserStore
}

/**
 * 优惠券页面
 */
@inject('cartStore', 'userStore')
@observer
class CouponPage extends Component<{}> {
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
  config: Config = { navigationBarTitleText: '优惠券' }

  componentDidShow () {
    const { params } = this.$router

    if (params.product_info) {
      Taro.setNavigationBarTitle({ title: '选择优惠券' })

      this.inject.userStore.fetchCouponList(params.product_info)
    } else {
      this.inject.userStore.fetchCouponList()
    }
  }

  /**
   * 处理选中优惠券
   * 当结算页面过来时才可以选择
   */
  handleSelected = (coupon_id: string) => {
    const { params } = this.$router

    if (params.product_info) {
      // 请求后端
      this.inject.cartStore.fetchConfirmOrder(coupon_id).then(() => {
        // 返回上一页
        Taro.navigateBack()
      })
    }
  }

  render () {
    const { userStore: { openCouponList, unCouponList }} = this.inject

    return openCouponList.length > 0 || unCouponList.length > 0 ?
      <View className='couponPage'>
        <View className='availableCouponWrap'>
          {openCouponList.map((item, index) =>
            <CouponCard key={item.my_coupon_id + index} data={item} onSelect={this.handleSelected} />)}
        </View>
        {unCouponList.length > 0 &&
          <View className='unavailableCouponWrap'>
            <View className='title'>以下优惠券暂不可用</View>
            {unCouponList.map((item, index) =>
              <CouponCard key={item.my_coupon_id + index} data={item} />)}
          </View>
        }
      </View>
      :
      <View className='couponPage'>
        <View className='emptyImg' />
        <View className='emptyText'>您暂无可用优惠券~</View>
      </View>
  }
}

export default CouponPage
