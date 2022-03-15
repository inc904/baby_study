import {
  CHANGE_INPUT_VALUE,
  ADD_TODOITEM,
  DELETE_TODOITEM,
  INIT_LIST_ACTION
} from './actionTypes'
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
