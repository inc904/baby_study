import {
  CHANGE_INPUT_VALUE,
  ADD_TODOITEM,
  DELETE_TODOITEM,
  INIT_LIST_ACTION,
  GET_INIT_LIST_SAGA
} from './actionTypes'
import axios from 'axios'

export const getInputChangeValueAction = value => ({
  type: CHANGE_INPUT_VALUE,
  value
})
export const addnewItemAction = () => ({
  type: ADD_TODOITEM
})
export const deleteItemAction = index => ({
  type: DELETE_TODOITEM,
  value: index
})
export const initListAction = data => ({
  type: INIT_LIST_ACTION,
  data
})
export const getInitSagaAction = () => ({
  type: GET_INIT_LIST_SAGA
})

// export const getTodoListData = () => {
//   return dispatch => {
//     axios
//       .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//       .then(res => {
//         const data = res.data
//         const action = initListAction(data)
//         dispatch(action)
//         // console.log(data)
//       })
//   }
// }
