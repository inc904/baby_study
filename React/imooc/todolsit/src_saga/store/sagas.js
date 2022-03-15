import { takeEvery, put } from 'redux-saga/effects'
import { GET_INIT_LIST_SAGA } from './actionTypes'
import axios from 'axios'
import { initListAction } from './actionCreators'

function* fetchInitList() {
  console.log('abc')
  // axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(res => {
  //   const data = res.data
  //   const action = initListAction(data)
  //   // store.dispatch(action)
  //   put(action)
  // })

  // const res = yield axios.get(
  //   'https://jsonplaceholder.typicode.com/todos?_limit=5'
  // )
  // const action = initListAction(res.data)
  // yield put(action)

  try {
    const res = yield axios.get(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
    )
    const action = initListAction(res.data)
    yield put(action)
  } catch (e) {
    console.log('请求失败')
  }
}
// generator 函数
function* mySaga() {
  yield takeEvery(GET_INIT_LIST_SAGA, fetchInitList)
}

export default mySaga
