import requestData from '@/utils/requestData'
import { ILiProductInfo, IProductDetail } from '@/interfaces/product'

/**
 * 对应后端涉及到产品的 API
 */
class ProductService {
  /**
   * 产品列表
   */
  fetchProductList (params: {
  /** 是否推荐 1:推荐 0:全部 */
  is_recommend?: 1 | 0
  /** 分类ID 默认为0全部 */
  category_id?: string
  /** 搜索关键字 */
  keyword?: string
  page: number
  num: number
  }): Promise<{ count: number; lists: ILiProductInfo[] }> {
    return requestData({
      method: 'POST',
      api: 'storex/product/product/search',
      params
    })
  }

  /**
   * 获取产品详情
   */
  fetchProductDetail (params: { product_id: number }): Promise<IProductDetail> {
    return requestData({
      method: 'GET',
      api: 'storex/product/product/item',
      params
    })
  }

  /**
   * 获取商品富文本描述
   * @param params
   */
  fetchProductDesc (params: {
  product_id: number
  }): Promise<{
    product_id: number
    /** 富文本描诉 HTML */
    content: string
    }> {
    return requestData({
      method: 'GET',
      api: 'storex/product/product/get_content_detail',
      params
    })
  }

  /**
   * 获取商品的SKU列表
   * @param {Object} params
   * @param {string} params.standard 规格,JSON字符串
   */
  fetchProductSku (params: { product_id: number; standard: string }): Promise<any> {
    return requestData({
      method: 'POST',
      api: 'storex/product/product/get_sku_list_at_page',
      params
    })
  }
}

export default new ProductService()
