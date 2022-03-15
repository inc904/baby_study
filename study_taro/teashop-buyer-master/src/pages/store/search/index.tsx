import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IProductStore } from '@/stores/productStore'
import ProductCard from '@/components/product/ProductCard'
import ProductSkuModal from '@/components/product/ProductSkuModal'
import '@/components/product/ProductSkuModal/cover.scss'
import { action } from 'mobx'
import './index.scss'

interface State {
  searchKey: string
}

interface InjectStoreProps {
  productStore: IProductStore
}

/**
 * 产品搜索页
 */
@inject('productStore')
@observer
class SearchPage extends Component<{}, State> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = { navigationBarTitleText: '搜索' }

  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  readonly state: State = { searchKey: '' }

  componentWillMount () {
    const searchKey = this.$router.params.searchKey

    this.setState({ searchKey })
  }

  /**
   * 监听用户上拉触底事件
   * 触底加载新数据
   */
  onReachBottom () {
    const { productStore } = this.inject
    const { searchDataList, searchListIsEnd } = productStore

    if (searchDataList && !searchListIsEnd) {
      // 加载下一页内容
      productStore.searchProductData({
        keyword: this.state.searchKey,
        page: searchDataList.page + 1
      })
    }
  }

  @action
  componentWillUnmount () {
    // 离开页面时关闭SkuModal 清除搜索数据
    this.inject.productStore.isSkuModalOpened = false
    this.inject.productStore.searchDataList = null
  }

  /**
   * 修改关键词
   */
  handleChange = (value: string | any) => {
    let _value: string

    // fixbug Taro-UI AtSearchBar
    if (typeof value === 'object') {
      _value = value.detail.value
    } else {
      _value = value
    }

    this.setState({ searchKey: _value })

    return _value
  }

  /**
   * 提交搜索
   */
  handleSubmit = () => {
    this.inject.productStore.searchProductData({ keyword: this.state.searchKey }).then(() => {
      Taro.setNavigationBarTitle({ title: '搜索结果' })
    })
  }

  render () {
    const { productStore: { searchDataList, productData, searchListIsEnd }} = this.inject

    return (
      <View className='searchPage'>
        <View className='serchFormWrap'>
          <View className='at-search-bar at-search-bar--fixed'>
            <View className='at-search-bar__input-cnt'>
              <View className='at-search-bar__placeholder-wrap'>
                <Text className='at-icon at-icon-search' />
              </View>
              <Input
                className='at-search-bar__input'
                placeholder='搜索所需商品'
                type='text'
                confirmType='search'
                value={this.state.searchKey}
                focus
                onInput={this.handleChange}
                onConfirm={this.handleSubmit}
              />
            </View>
          </View>
          {/* 自定义 AtSearchBar
           <AtSearchBar
            fixed
            focus
            showActionButton={false}
            value={this.state.searchKey}
            onChange={this.handleChange}
            onConfirm={this.handleSubmit}
          /> */}
        </View>
        <View className='productList'>
          {searchDataList &&
            searchDataList.lists.map(product_id =>
              <View key={product_id}>{productData.get(product_id) && <ProductCard type='list' productId={product_id} />}</View>)}
          {!searchListIsEnd &&
            <View className='productListLoading'>
              <Text className='icon icon-loading rotateAni' />
            </View>
          }
        </View>
        <ProductSkuModal />
      </View>
    )
  }
}

export default SearchPage
