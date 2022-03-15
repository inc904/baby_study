import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Navigator, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { IProductStore } from '@/stores/productStore'
import { ICommonStore } from '@/stores/commonStore'
import { AtTabs, AtTabsPane } from 'taro-ui'
import ProductCard from '@/components/product/ProductCard'
import ProductSkuModal from '@/components/product/ProductSkuModal'
import '@/components/product/ProductSkuModal/cover.scss'
import { toJS, autorun, action } from 'mobx'
import './index.scss'
import { ICartStore } from '@/stores/cartStore'

interface InjectStoreProps {
  productStore: IProductStore
  commonStore: ICommonStore
  cartStore: ICartStore
}

/**
 * 首页
 */
@inject('productStore', 'commonStore', 'cartStore')
@observer
class StorePage extends Component<{}> {
  get inject () {
    // 兼容注入store
    return this.props as InjectStoreProps
  }

  config: Config = { navigationBarTitleText: '首页' }

  // componentDidShow () {
  //   // 自定义tarbar
  //   // 当前页面对应的 index
  //   this.$scope.getTabBar().setData({ selected: 0 })
  // }

  componentDidMount () {
    // 请求初始数据
    const { productStore, commonStore } = this.inject

    productStore.fetchTabListData()
    productStore.fetchTabProductData({ category_id: '0' })
    commonStore.fetchStoreData()

    autorun(
      () => {
        if (commonStore.shopName !== '') {
          Taro.setNavigationBarTitle({ title: commonStore.shopName })
        }
      },
      {
        onError (e) {
          console.log(e)
        }
      }
    )
  }

  componentDidShow () {
    // 每次进入都更新当前Tab 产品数据
    const { productStore, cartStore } = this.inject
    const { tabList, currentTabIndex } = productStore

    if (productStore.productData.size > 0) {
      const { category_id } = tabList[currentTabIndex]

      // 初始化走componentDidMount请求数据
      productStore.fetchTabProductData({ category_id })
    }

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
   * 监听用户上拉触底事件
   * 触底加载新数据
   */
  onReachBottom () {
    const { productStore } = this.inject
    const { tabList, tabDataList, currentTabIndex } = productStore
    const { category_id } = tabList[currentTabIndex]
    const currentTabListData = tabDataList![category_id]

    // 当后端返回的条数小于 页数乘以每页条数 表示已到最后一页
    if (!productStore.storeListIsEnd) {
      // 加载下一页内容
      productStore.fetchTabProductData({
        category_id,
        page: currentTabListData.page + 1
      })
    }
  }

  /**
   * 点击tab头切换tab
   */
  @action
  handleTabClick = index => {
    const { productStore } = this.inject
    const category_id = productStore.tabList[index].category_id

    if (index !== productStore.currentTabIndex) {
      productStore.currentTabIndex = index

      productStore.fetchTabProductData({ category_id })
    }
  }

  @action
  componentWillUnmount () {
    // 离开页面时关闭SkuModal
    this.inject.productStore.isSkuModalOpened = false
  }

  render () {
    const {
      productStore: { tabList, currentTabIndex, tabDataList, productData, storeListIsEnd },
      commonStore: { bannerList, shopName }
    } = this.inject

    return (
      <View className='storePageWrap'>
        <View className='sectionTop'>
          <View className='topPosition'>
            <Text className='icon iconPos' />
            <Text>{shopName}</Text>
          </View>
          <Navigator className='navSearch' url='/pages/store/search/index?searchKey='>
            <Text className='icon iconSearch' />
          </Navigator>
        </View>
        <View className='sectionSwiper'>
          {bannerList ?
            <Swiper className='bannnerSwiper' indicatorActiveColor='#FFFFFF' indicatorDots autoplay>
              {bannerList.map((item, index) =>
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
            :
            <View className='swiperSkeleton' />
          }
        </View>
        <View className='sectionProduct'>
          <AtTabs current={currentTabIndex} scroll swipeable={false} tabList={toJS(tabList)} onClick={this.handleTabClick}>
            {tabList.map((tab, index) =>
              <AtTabsPane key={tab.category_id} current={currentTabIndex} index={index}>
                {tabDataList && toJS(tabDataList) && tabDataList[tab.category_id] ?
                  <View className='productListWrap'>
                    {tabDataList[tab.category_id].lists.map(id =>
                      <View className='productListItem' key={id}>
                        {productData.get(id) && <ProductCard type='grid' productId={id} />}
                      </View>)}
                    {!storeListIsEnd &&
                      <View className='productListLoading'>
                        <View className='icon icon-loading'>
                          <View className='at-loading'>
                            <View className='at-loading__ring' />
                            <View className='at-loading__ring' />
                            <View className='at-loading__ring' />
                          </View>
                        </View>
                      </View>
                    }
                  </View>
                  :
                  <View className='productListSkeleton' />
                }
              </AtTabsPane>)}
          </AtTabs>
        </View>
        {/* modal组件不能挂在AtTab下 */}
        <ProductSkuModal />
      </View>
    )
  }
}

export default StorePage
