import {
  CHANGE_INPUT_VALUE,
  ADD_TODOITEM,
  DELETE_TODOITEM,
  INIT_LIST_ACTION
} from './actionTypes'
const defaultState = {
  inputValue: '',
  list: []
}
export default (state = defaultState, action) => {
  console.log(state, action)
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state)) // 对之前的数据进行深拷贝
    newState.inputValue = action.value // 把最新的数据 赋值给 新数据对象
    return newState // 把 新的 state 返回给 store，因为 reducer 可以接收 state，但是绝不能修改 state
  }
  if (action.type === ADD_TODOITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    const len = newState.list.length
    const newItem = {
      userId: 1,
      id: len,
      title: newState.inputValue,
      completed: false
    }
    newState.list.push(newItem)
    newState.inputValue = ''
    return newState
  }
  if (action.type === DELETE_TODOITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    console.log(action)
    newState.list.map((item, index) => {
      if (item.id === action.value) {
        newState.list.splice(index, 1)
      }
      return true
    })
    return newState
  }
  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = action.data
    return newState
  }
  return state
}
