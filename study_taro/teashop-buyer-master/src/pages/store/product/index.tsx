import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, RichText, Text, Navigator } from '@tarojs/components'
import ProductSkuModal from '@/components/product/ProductSkuModal'
import '@/components/product/ProductSkuModal/cover.scss'
import { observer, inject } from '@tarojs/mobx'
import { IProductStore } from '@/stores/productStore'
import { AtBadge, AtButton } from 'taro-ui'
import { IProductDetail } from '@/interfaces/product'
import { ICartStore } from '@/stores/cartStore'
import { action, toJS } from 'mobx'
import transformPrice from '@/utils/transformPrice'
import './index.scss'

interface InjectStoreProps {
  productStore: IProductStore
  cartStore: ICartStore
}

/**
 * 产品详情页
 */
@inject('productStore', 'cartStore')
@observer
class ProductPage extends Component<{}> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '商品详情' }

  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  componentDidMount () {
    const product_id = parseInt(this.$router.params.productId)

    // 请求购物车数量
    this.inject.cartStore.fetchCartNum()

    // 请求产品详情
    this.inject.productStore.fetchProductDetail(product_id)
  }

  @action
  componentWillUnmount () {
    // 离开页面时关闭SkuModal
    this.inject.productStore.isSkuModalOpened = false
  }

  /**
   * 加入购物车 打开选择sku弹窗
   */
  @action
  handleOpenSkuModal = () => {
    const { productStore, cartStore } = this.inject
    const product_id = parseInt(this.$router.params.productId)
    const data = productStore.productDatailData as IProductDetail

    if (data.sku_count > 0) {
      this.inject.productStore.isSkuModalOpened = true
      this.inject.productStore.skuModalProductId = product_id

      // 获取sku 列表
      this.inject.productStore.fetchProductSku({ product_id })
    } else {
      // 直接加入购物车
      productStore.addProductToCart(product_id).then(() => {
        cartStore.fetchCartNum()

        Taro.showToast({ title: '添加成功', icon: 'none' })
      })
    }
  }

  render () {
    const {
      cartStore: { cartNum },
      productStore: { productDatailData }
    } = this.inject

    if (productDatailData.product_id === 0) {
      return null
    }

    const { images, thumb, title, sub_title, price, vip_price, buy_status, buy_status_text, content } = productDatailData as IProductDetail

    return (
      <View>
        <View className='productPage'>
          <View className='productSwiperWrap'>
            <Swiper className='productSwiper' indicatorActiveColor='#FFFFFF' indicatorDots autoplay>
              {images ?
                images.map((img, index) =>
                  <SwiperItem key={index}>
                    <View className='productImage'>
                      <Image mode='aspectFill' className='image' src={img} />
                    </View>
                  </SwiperItem>)
                :
                <SwiperItem>
                  <View className='productImage'>
                    <Image mode='aspectFill' className='image' src={thumb} />
                  </View>
                </SwiperItem>
              }
            </Swiper>
          </View>
          <View className='productInfoWrap'>
            <View className='infoName'>{title}</View>
            <View className='infoDesc'>{sub_title}</View>
            <View className='infoPrice'>
              <View className='price'>
                <Text className='icon'>￥</Text>
                {transformPrice(price)}
              </View>
              {vip_price !== 0 &&
                <View className='vipPriceWrap'>
                  ￥{transformPrice(vip_price)}
                  <Text className='icon iconVip' />
                </View>
              }
            </View>
          </View>
          <View className='productDetailWrap'>
            <View className='title'>
              <View className='bgLine' />
              <View className='text'>详情</View>
            </View>
            {content &&
              <View className='content'>
                <RichText nodes={toJS(content)} />
              </View>
            }
          </View>
          <View className='productBottomWrap'>
            <View className='cartBtn'>
              <Navigator url='/pages/cart/index' openType='switchTab'>
                {cartNum > 0 ?
                  <AtBadge value={cartNum}>
                    <View className='icon iconCart2' />
                  </AtBadge>
                  :
                  <View className='icon iconCart2' />
                }
              </Navigator>
            </View>
            <View className='btn'>
              <AtButton onClick={this.handleOpenSkuModal} type='primary' disabled={buy_status !== 1}>
                {buy_status_text}
              </AtButton>
            </View>
          </View>
        </View>
        <ProductSkuModal />
      </View>
    )
  }
}

export default ProductPage
