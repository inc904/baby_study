import { createStore } from 'redux'
import reducer from './reducer' // 管理员

const store = createStore(reducer)
export default store
