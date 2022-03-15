import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import _ from 'lodash'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtTag, AtButton } from 'taro-ui'
import { IProductStore } from '@/stores/productStore'
import { View, Text } from '@tarojs/components'
import { ISkuSelected, ISkuData } from '@/interfaces/product'
import { reaction, action } from 'mobx'
import transformPrice from '@/utils/transformPrice'
import './index.scss'
import { ICartStore } from '@/stores/cartStore'

interface State {
  selected: ISkuSelected
}

interface InjectStoreProps {
  productStore: IProductStore
  cartStore: ICartStore
}

/**
 * 产品sku选择器
 */
@inject('productStore', 'cartStore')
@observer
class ProductSkuModal extends Component<{}, State> {
  readonly state: State = { selected: {}}

  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  componentDidMount () {
    reaction(
      () => this.generateSelected(this.inject.productStore.skuData),
      selected => {
        setTimeout(() => {
          this.setState({ selected })
        }, 0)
      }
    )
  }

  generateSelected (skuData: ISkuData | null) {
    if (skuData) {
      const nextSelected: ISkuSelected = {}

      skuData.lists.forEach(sku => {
        // 过滤出sku选中状态 没有选中为空字符串
        nextSelected[sku.standard_name] = _.get(_.find(sku.standard_list, 'selected'), 'value', '')
      })

      return nextSelected
    } else {
      return {}
    }
  }

  @action
  handleClose = () => {
    this.inject.productStore.isSkuModalOpened = false
  }

  @action
  handleConfirm = () => {
    const { productStore, cartStore } = this.inject

    if (productStore.skuData && productStore.skuData.product_sku !== 0) {
      productStore.isSkuModalOpened = false
      // 加一个进购物车
      productStore.addProductToCart(productStore.skuModalProductId as number).then(() => {
        cartStore.fetchCartNum()
      })
    } else {
      Taro.showToast({ title: '请选择型号', icon: 'none' })
    }
  }

  /**
   * 处理sku选中和取消 同时后端获取状态
   */
  handleSelectSku = (value: { name: string; active: boolean }) => {
    if (value.active) {
      // 如果是选中状态 不做操作
      return false
    }

    // 使用"___"分隔sku standard_name和value
    const seleteTag: [string, string] = value.name.split('___') as [string, string]
    const prevSelected = this.state.selected // 缓存上一个状态
    const nextSelected: ISkuSelected = Object.assign({}, prevSelected, { [seleteTag[0]]: value.active ? null : seleteTag[1] })

    // 先将状态扭转
    this.setState({ selected: nextSelected })

    // 请求后端
    this.inject.productStore
      .fetchProductSku({
        product_id: this.inject.productStore.skuModalProductId as number,
        sku: nextSelected
      })
      .catch(() => {
        // 保存失败 还原状态
        this.setState({ selected: prevSelected })
      })
  }

  beSkuVal (skuData: ISkuData) {
    const sedSku = skuData.lists
      .map(sku => _.get(sku.standard_list.find(skuAttr => skuAttr.selected), 'value', ''))
      .filter(val => val !== '')

    if (sedSku.length <= 0) {
      return ''
    } else {
      return '(' + sedSku.join(',') + ')'
    }
  }

  render () {
    const { productStore: { isSkuModalOpened, skuData, productData, skuModalProductId }} = this.inject
    const { selected } = this.state

    return (
      <AtModal onClose={this.handleClose} isOpened={isSkuModalOpened}>
        <AtModalHeader>
          <View className='skuModalHeader'>
            <Text className='title'>{skuModalProductId && productData.get(skuModalProductId)!.title}</Text>
            <Text className='icon iconClose' />
          </View>
        </AtModalHeader>
        <AtModalContent>
          <View className='skuModalContent'>
            {skuData &&
              skuData.lists.map(sku =>
                <View key={sku.standard_name}>
                  <View className='skuAttrName'>{sku.standard_name}:</View>
                  <View className='skuAttrWrap'>
                    {sku.standard_list.map(skuAttr =>
                      <AtTag
                        key={skuAttr.value}
                        name={`${sku.standard_name}___${skuAttr.value}`}
                        onClick={this.handleSelectSku.bind(this)}
                        active={selected[sku.standard_name] === skuAttr.value}
                        disabled={!skuAttr.is_exist}
                      >
                        {skuAttr.value}
                      </AtTag>)}
                  </View>
                </View>)}
          </View>
        </AtModalContent>
        <AtModalAction>
          <View className='skuModalFooter'>
            <View className='skuInfo'>
              <View className='skuPrice'>
                <Text className='icon'>￥</Text>
                {skuData ? transformPrice(skuData.price, false) : 0}
              </View>
              {skuData && skuData.vip_price !== 0 &&
                <View className='skuVipPrice'>
                  ￥{transformPrice(skuData.vip_price, false)}
                  <Text className='icon iconVip' />
                </View>
              }
              <View className='skuVal'>{skuData ? this.beSkuVal(skuData) : ''}</View>
            </View>
            <AtButton className='skuBtn' circle size='small' type='primary' onClick={this.handleConfirm}>
              <View className='btnContent'>
                <Text className='icon iconPlus' /> 加入购物车
              </View>
            </AtButton>
          </View>
        </AtModalAction>
      </AtModal>
    )
  }
}

export default ProductSkuModal
