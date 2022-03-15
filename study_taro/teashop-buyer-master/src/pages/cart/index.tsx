import Taro, { Component, Config } from '@tarojs/taro'
import _ from 'lodash'
import './index.scss'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtCheckbox, AtButton } from 'taro-ui'
import { ICartStore } from '@/stores/cartStore'
import CartProductCard from '@/components/cart/CartProductCard'
import { action } from 'mobx'
import transformPrice from '@/utils/transformPrice'

interface InjectStoreProps {
  cartStore: ICartStore
}

@inject('cartStore')
@observer
class CartPage extends Component<{}> {
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
  config: Config = { navigationBarTitleText: '购物车' }

  // componentDidShow () {
  //   // 自定义tarbar
  //   // 当前页面对应的 index
  //   this.$scope.getTabBar().setData({ selected: 1 })
  // }

  // componentDidMount () {
  //   this.inject.cartStore.fetchCartProductData()
  // }

  componentDidShow () {
    const { cartStore } = this.inject

    // 每次进入都更新数据
    cartStore.fetchCartProductData()

    // 检查是否需要更新Tabbadge
    if (!cartStore.updatedCartNum) {
      cartStore.updatedCartNum = true
      // 手动写入
      cartStore.fetchCartNum().then(num => {
        Taro.setTabBarBadge({ index: 1, text: num })
      })
    }
  }

  /**
   * 全选和取消全选
   */
  @action
  handleCheckAll = value => {
    const { checkList, checkedKeys } = this.inject.cartStore

    if (value.length === 1) {
      checkList.replace(checkedKeys)
    } else {
      checkList.clear()
    }
  }

  handleGoCheckout = () => {
    this.inject.cartStore.fetchConfirmOrder().then(() => {
      // 发起成功跳转 订单结算页
      Taro.navigateTo({ url: '/pages/checkout/index' })
    })
  }

  render () {
    const { cartStore: { totalPrice, cartProductKeyList, checkedAll, checkNum }} = this.inject

    return (
      <View className='cartPage'>
        <View className='productListWrap'>
          {cartProductKeyList.map(key =>
            <CartProductCard key={key} productKey={key} />)}
        </View>
        <View className='cartBottomMenu'>
          <View className='checkAll'>
            <AtCheckbox
              options={[
                {
                  value: 'checkAll',
                  label: '全选'
                }
              ]}
              onChange={this.handleCheckAll}
              selectedList={checkedAll ? ['checkAll'] : []}
            />
          </View>
          <View className='priceWrap'>
            <Text>￥{transformPrice(totalPrice)}</Text>
          </View>
          <View className='btnWrap'>
            <AtButton disabled={checkNum <= 0} type='primary' onClick={this.handleGoCheckout}>
              去结算{checkNum <= 0 ? '' : `(${checkNum})`}
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default CartPage
