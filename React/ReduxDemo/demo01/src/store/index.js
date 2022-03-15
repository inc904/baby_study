import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(
  // 创建数据仓储
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
