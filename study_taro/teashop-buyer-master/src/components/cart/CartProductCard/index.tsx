import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import _ from 'lodash'
import { AtSwipeAction, AtCheckbox } from 'taro-ui'
import { ICartStore } from '@/stores/cartStore'
import { action, toJS } from 'mobx'
import classNames from 'classnames'
import { ICartProduct } from '@/interfaces/checkout'
import './index.scss'
import transformPrice from '@/utils/transformPrice'

interface CartProductCardProps {
  productKey: string
}

interface State {
  checkedList: string[]
}

interface InjectStoreProps extends CartProductCardProps {
  cartStore: ICartStore
}

/**
 * 购物车产品
 */
@inject('cartStore')
@observer
class CartProductCard extends Component<CartProductCardProps, State> {
  readonly state: State = { checkedList: [] }

  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  handleDeleteSku = () => {
    const { productKey } = this.props

    this.inject.cartStore.delCartProductData(productKey).then(() => {
      this.inject.cartStore.fetchCartNum()
    })
  }

  /**
   * 修改选中项
   */
  @action
  handleChange = (value: string[]) => {
    const { cartStore: { checkList }} = this.inject

    checkList.replace(value)
  }

  /**
   * 加数量
   */
  plusCartItemNum = () => {
    const { productKey } = this.props
    const thisItem = this.inject.cartStore.cartProductData.get(productKey)

    if (thisItem && thisItem.no_stock === 1 && thisItem.max_buy_num > thisItem.num) {
      this.inject.cartStore.setCartProductNum(productKey, thisItem.num + 1).then(() => {
        this.inject.cartStore.fetchCartNum()
      })
    }
  }

  /**
   * 减数量
   */
  minusCartItemNum = () => {
    const { productKey } = this.props
    const thisItem = this.inject.cartStore.cartProductData.get(productKey)

    if (thisItem && thisItem.no_stock === 1 && thisItem.min_buy_num < thisItem.num) {
      this.inject.cartStore.setCartProductNum(productKey, thisItem.num - 1).then(() => {
        this.inject.cartStore.fetchCartNum()
      })
    }
  }

  render () {
    const { cartStore: { checkList, cartProductData }} = this.inject
    const { productKey } = this.props
    const productData = cartProductData.get(productKey) || {}

    if (_.isEmpty(productData)) {
      return <View className='productCard' />
    }

    const { thumb, title, standard, price, num, max_buy_num, no_stock, vip_price } = productData as ICartProduct

    return (
      <View className='productItemWrap'>
        <AtSwipeAction
          options={[
            {
              text: ' ',
              style: { backgroundColor: '#ff6140', color: '#ff6140' },
              className: 'removeBtn'
            }
          ]}
          onClick={this.handleDeleteSku}
        >
          <View className='productCard'>
            <View className='cardCheckWrap'>
              <AtCheckbox
                options={[{ value: productKey, label: '', disabled: no_stock === 2 }]}
                selectedList={toJS(checkList)}
                onChange={this.handleChange}
              />
            </View>
            <View className='cardImageWrap'>
              <Image mode='aspectFill' className='productImg' src={thumb} />
              {no_stock === 2 &&
                <View className='imgSoldMark'>
                  <View className='bg' />
                  <Text className='text'>已售罄</Text>
                </View>
              }
            </View>
            <View className='cardInfoWrap'>
              <View className='productTitle'>{title}</View>
              <View className='productSku'>{standard}</View>
              <View className='productPrice'>
                <View className='price'>￥{transformPrice(price)}</View>
                {!!vip_price &&
                  <View className='vipPrice'>
                    ￥{transformPrice(vip_price)}
                    <Text className='icon iconVip' />
                  </View>
                }
              </View>
            </View>
            <View className='cardActionWrap'>
              <Text className={classNames('btn-minus', 'btn-circle', { disable: num === 1 })} onClick={this.minusCartItemNum} />
              <Text className='num'>{num}</Text>
              <Text
                className={classNames('btn-plus', 'btn-circle', { disable: no_stock === 2 || num >= max_buy_num })}
                onClick={this.plusCartItemNum}
              />
            </View>
          </View>
        </AtSwipeAction>
      </View>
    )
  }
}

export default CartProductCard
