import { observable, runInAction, action, ObservableMap, set } from 'mobx'
import _ from 'lodash'
import { IPager } from '@/interfaces/common'
import { ILiProductInfo, ISkuData, IProductDetail, ISkuSelected } from '@/interfaces/product'
import categoryService from '@/services/categoryService'
import productService from '@/services/productService'
import orderService from '@/services/orderService'

interface ITabs {
  title: string
  category_id: string
}

// 保存tab切换页与产品Id列表的关系 mixins分页数据结构
interface TabData {
  [category_id: string]: IPager & {
    lists: number[]
  }
}

export interface IProductStore {
  currentTabIndex: number
  tabList: ITabs[]
  productData: Map<number, ILiProductInfo>
  tabDataList: TabData | null
  /** 主页当前tab列表数据是否已加载完 */
  storeListIsEnd: boolean

  searchDataList: (IPager & { lists: number[] }) | null
  /** 搜索界面列表数据是否已加载完 */
  searchListIsEnd: boolean

  /** sku modal 显隐控制 */
  isSkuModalOpened: boolean
  skuModalProductId: number | null
  skuData: ISkuData | null

  /** 获取首页Tab列表*/
  fetchTabListData: () => Promise<any>
  /** Tab切换获取产品数据 */
  fetchTabProductData: (params: { category_id: string; page?: number }) => Promise<any>
  /** 按keyword搜索产品数据 */
  searchProductData: (params: { keyword: string; page?: number }) => Promise<any>

  /** 产品详情 */
  productDatailData: IProductDetail | { product_id: number }

  /** 获取产品详情 */
  fetchProductDetail: (product_id: number) => Promise<void>
  /** 通过条件获取产品sku数据 */
  fetchProductSku: (params: { product_id: number; sku?: ISkuSelected }) => Promise<any>

  /** 添加1个产品到购物车 */
  addProductToCart: (product_id: number) => Promise<void>

  /** 删除1个在购物车的产品*/
  removeProductOfCart: (product_id: number) => Promise<void>
}

class ProductStore implements IProductStore {
  @observable
  currentTabIndex = 0 // 选中的tab

  @observable.ref
  tabList: ITabs[] = []

  // 产品数据源
  productData: ObservableMap<number, ILiProductInfo> = observable.map()

  // 主页产品
  @observable
  tabDataList: TabData | null = null

  @observable
  storeListIsEnd = false

  // 搜索结果产品列表
  @observable
  searchDataList: (IPager & { lists: number[] }) | null = null

  @observable
  searchListIsEnd = false

  @observable
  isSkuModalOpened = false // 选择sku弹窗 打开状态

  @observable
  skuModalProductId: number | null = null // 选择sku弹窗 打开的产品Id

  @observable
  skuData: ISkuData | null = null // 存放sku

  @action
  async fetchTabListData () {
    const resData = await categoryService.fetchTabLit()

    runInAction(() => {
      this.tabList = resData.lists.map(
        (category): ITabs => {
          return { category_id: category.category_id, title: category.name }
        }
      )
    })
  }

  @action
  async fetchTabProductData (params: { category_id: string; page?: number }) {
    // 加入默认参数
    const reqParams: any = Object.assign({ page: 1, num: 20 }, params)

    if (params.category_id === '0') {
      reqParams.is_recommend = 1
    }

    // 获取后端数据
    const resData = await productService.fetchProductList(reqParams)

    const productIdList = resData.lists.map(item => item.product_id)
    const resuleData = {
      page: reqParams.page,
      num: reqParams.num,
      count: resData.count,
      lists: productIdList
    }

    runInAction(() => {
      this.storeListIsEnd = resData.lists.length === 0

      // 填入产品map对象
      this.productData.merge(resData.lists.map(item => [item.product_id, item]))

      // 类目tab切换
      if (reqParams.page === 1) {
        // 加载第一页
        if (!this.tabDataList) {
          // 首页初次加载
          this.tabDataList = { [reqParams.category_id]: resuleData }
        } else if (!this.tabDataList[reqParams.category_id]) {
          // 当前类目初次加载
          set(this.tabDataList, { [reqParams.category_id]: resuleData })
        } else {
          // 重新加载当前类目
          this.tabDataList[reqParams.category_id].page = 1
          this.tabDataList[reqParams.category_id].lists = productIdList
        }
      } else {
        // 翻页
        this.tabDataList![reqParams.category_id].page = reqParams.page
        this.tabDataList![reqParams.category_id].lists.push(...productIdList)
      }
    })
  }

  /**
   * 关键词搜索产品
   */
  @action
  async searchProductData (params: { keyword: string; page?: number }) {
    // 加入默认参数
    const reqParams = Object.assign({ page: 1, num: 20 }, params)
    // 获取后端数据
    const resData = await productService.fetchProductList(reqParams)

    runInAction(() => {
      this.searchListIsEnd = resData.lists.length === 0
      const productIdList = resData.lists.map(item => item.product_id)

      // 填入产品map对象
      this.productData.merge(resData.lists.map(item => [item.product_id, item]))

      if (reqParams.page === 1) {
        // 加载第一页
        this.searchDataList = {
          page: reqParams.page,
          num: reqParams.num,
          count: resData.count,
          lists: productIdList
        }
      } else {
        // 翻页
        this.searchDataList && (this.searchDataList.page = reqParams.page)
        this.searchDataList && this.searchDataList.lists.push(...productIdList)
      }
    })
  }

  @observable
  productDatailData: IProductDetail | { product_id: number } = { product_id: 0 }

  @action
  async fetchProductDetail (product_id) {
    this.productDatailData = { product_id }
    // 获取后端数据
    const resData = await productService.fetchProductDetail({ product_id })
    // 获取富文本
    const resContentData = await productService.fetchProductDesc({ product_id })

    runInAction(() => {
      set(this.productDatailData, Object.assign(resData, resContentData))
    })
  }

  @action
  async fetchProductSku (params: { product_id: number; sku?: ISkuSelected }) {
    const reqSku = params.sku ? _.omitBy(params.sku, _.isNull) : ''

    // 获取后端数据
    const resData = await productService.fetchProductSku({
      product_id: params.product_id,
      standard: JSON.stringify(reqSku)
    })

    runInAction(() => {
      this.skuData = resData
    })
  }

  /**
   * 添加到购物车
   */
  @action
  async addProductToCart (product_id: number) {
    const data = this.productData.get(product_id) as ILiProductInfo

    data.added_cart_num += 1

    try {
      // 提交
      if (data.sku_count <= 0) {
        // 无sku
        await orderService.addProductToCart({ product_id, num: 1 })
      } else {
        const { product_sku } = this.skuData as ISkuData

        await orderService.addProductToCart({ product_id, num: 1, product_sku })

        runInAction(() => {
          // 更改前端列表中数据的状态
          if (data.last_added_product_sku === 0 || data.added_cart_num === 1) {
            data.last_added_product_sku = product_sku
          } else if (data.last_added_product_sku !== product_sku) {
            data.last_added_product_sku = product_sku
            data.has_multi_standard = 1
          }
        })
      }
    } catch (err) {
      runInAction(() => {
        // 还原数据
        data.added_cart_num -= 1
      })
    }
  }

  /**
   * 从购物车删除一个数量
   */
  @action
  async removeProductOfCart (product_id) {
    const data = this.productData.get(product_id) as ILiProductInfo

    data.added_cart_num -= 1

    try {
      // 提交
      await orderService.setCartProductNum({ product_id, num: data.added_cart_num, product_sku: data.last_added_product_sku })
    } catch (err) {
      runInAction(() => {
        // 还原数据
        data.added_cart_num += 1
      })
    }
  }
}

export default ProductStore
