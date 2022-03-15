import requestData from '@/utils/requestData'

/**
 * 对应后端Index相关 API
 */
class IndexService {
  /**
   * 获取首页相关数据
   */
  fetchIndexData (): Promise<any> {
    return requestData({
      method: 'POST',
      api: 'storex/index/index/get_index'
    })
  }
}

export default new IndexService()
