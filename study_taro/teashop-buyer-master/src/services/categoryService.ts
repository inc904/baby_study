import requestData from '@/utils/requestData'
import { IProductCategory } from '@/interfaces/product'

/**
 * 对应后端类目相关 API
 */
class CategoryService {
  /**
   * 获取首页滑动分类
   */
  fetchTabLit (): Promise<{ lists: IProductCategory[] }> {
    return requestData({
      method: 'POST',
      api: 'storex/category/category/roll_lists'
    })
  }
}

export default new CategoryService()
