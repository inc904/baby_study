import Taro, { Component, navigateTo } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import _ from 'lodash'
import { IProductStore } from '@/stores/productStore'
import transformPrice from '@/utils/transformPrice'
import classNames from 'classnames'
import { action } from 'mobx'
import { ILiProductInfo } from '@/interfaces/product'
import './index.scss'
import { ICartStore } from '@/stores/cartStore'

interface ProductCardProps {
  productId: number
  type?: 'grid' | 'list'
}

interface InjectStoreProps extends ProductCardProps {
  productStore: IProductStore
  cartStore: ICartStore
}

/**
 * 产品卡片 风格为grid和list
 */
@inject('productStore', 'cartStore')
@observer
class ProductCard extends Component<ProductCardProps> {
  static defaultProps = { type: 'grid' }

  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  /**
   * 点击加号 直接添加或者打开选择sku弹窗
   */
  @action
  handleOpenSkuModal = () => {
    const { productStore, cartStore } = this.inject
    const { productId } = this.props
    const productData = this.inject.productStore.productData.get(productId) as ILiProductInfo

    if (!productData || productData.no_stock === 2) {
      // 如果是选中状态 不做操作
      return false
    }

    if (productData.sku_count > 0) {
      this.inject.productStore.isSkuModalOpened = true
      this.inject.productStore.skuModalProductId = productId

      // 获取sku 列表
      this.inject.productStore.fetchProductSku({ product_id: productId })
    } else {
      // 直接加入购物车
      productStore.addProductToCart(productId).then(() => {
        cartStore.fetchCartNum()
      })
    }
  }

  /**
   * 跳转到产品详情页
   */
  handleNavToDetail = () => {
    const { productId } = this.props

    // 预加载数据
    this.inject.productStore.fetchProductDetail(productId)

    navigateTo({ url: `/pages/store/product/index?productId=${productId}` })
  }

  /**
   * 减少产品
   */
  @action
  handleMinusNum = () => {
    const { productId } = this.props
    const thisData = this.inject.productStore.productData.get(productId) as ILiProductInfo

    if (thisData.has_multi_standard === 1) {
      Taro.showToast({ title: '多规格商品只能去购物车删除哦', icon: 'none' })
    } else {
      this.inject.productStore.removeProductOfCart(productId).then(() => {
        this.inject.cartStore.fetchCartNum()
      })
    }
  }

  render () {
    const { productId, type } = this.props
    const productData = (this.inject.productStore.productData.get(productId) || {}) as ILiProductInfo

    if (_.isEmpty(productData)) {
      return <View className='productCard' />
    }

    const { thumb, no_stock, title, sub_title, price, vip_price, added_cart_num, max_buy_num, has_multi_standard } = productData

    return (
      <View className={classNames('productCard', type)}>
        <View className='imgWrap' onClick={this.handleNavToDetail}>
          <Image mode='aspectFill' src={thumb} className='imgContext' />
          {no_stock === 2 &&
            <View className='imgSoldMark'>
              <View className='bg' />
              <Text className='text'>已售罄</Text>
            </View>
          }
        </View>
        <View className='contentWrap'>
          <View className='infoWrap' onClick={this.handleNavToDetail}>
            <View className='infoName'>{title}</View>
            <View className='infoDesc'>{sub_title}</View>
          </View>
          {type === 'grid' ?
            <View className={classNames('actionWrap', { inactive: no_stock === 2, beReduced: added_cart_num <= 0 })}>
              <View className='row price-wrap'>
                <View className='price'>￥{transformPrice(price, false)}</View>
              </View>
              <View className='row'>
                <Text className='vipPrice'>{vip_price > 0 ? `￥${transformPrice(vip_price, false)}` : ''}</Text>
                {vip_price > 0 && <Text className='icon iconVip' />}
              </View>
              <View className='numControlWrap'>
                <Text
                  className={classNames('btn-minus', 'btn-circle', { disable: has_multi_standard === 1 })}
                  onClick={this.handleMinusNum}
                />
                <Text className='num'>{added_cart_num}</Text>
                <Text
                  className={classNames('btn-plus', 'btn-circle', { disable: no_stock === 2 || added_cart_num >= max_buy_num })}
                  onClick={this.handleOpenSkuModal}
                />
              </View>
            </View>
            :
            <View className={classNames('actionWrap', { inactive: no_stock === 2, beReduced: added_cart_num <= 0 })}>
              <View className='row price-wrap'>
                <View className='price'>￥{transformPrice(price, false)}</View>
                <Text className='vipPrice'>{vip_price > 0 ? `￥${transformPrice(vip_price, false)}` : ''}</Text>
                {vip_price > 0 && <Text className='icon iconVip' />}
                <View className='numControlWrap'>
                  <Text
                    className={classNames('btn-minus', 'btn-circle', { disable: has_multi_standard === 1 })}
                    onClick={this.handleMinusNum}
                  />
                  <Text className='num'>{added_cart_num}</Text>
                  <Text
                    className={classNames('btn-plus', 'btn-circle', { disable: no_stock === 2 || added_cart_num >= max_buy_num })}
                    onClick={this.handleOpenSkuModal}
                  />
                </View>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}

export default ProductCard
