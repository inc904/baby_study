import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionTypes'
const defaultState = {
  // 默认数据
  inputValue: 'Write Something',
  list: ['time 8, coding', 'time 9, meeting', 'time 10, sleeping']
}

export default (state = defaultState, action) => {
  // Reducer 里只能接收 state ，不能改变 state
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.value, 1)
    return newState
  }
  return state
}
