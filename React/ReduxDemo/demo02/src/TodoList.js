import React from 'react'
// import store from './store'
import { connect } from 'react-redux' // 连接器
const TodoList = props => {
  let { inputValue, inputChange, addItem, list } = props
  return (
    <div>
      <div>
        <input
          placeholder="write something"
          value={inputValue}
          onChange={inputChange}
        />
        <button onClick={addItem}>提交</button>
        <ul>
          {list.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
// class TodoList extends Component {
//   // 只有内部只有 render 函数，没有其他操作逻辑代码，
//  // 所以可以改造成 无状态组件，下次体提交修改哈
//   render() {
//     let { inputValue, inputChange, addItem, list } = this.props
//     return (
//       <div>
//         <div>
//           <input
//             placeholder="write something"
//             value={inputValue}
//             onChange={inputChange}
//           />
//           <button onClick={addItem}>提交</button>
//           <ul>
//             {list.map((item, index) => {
//               return <li key={index}>{item}</li>
//             })}
//           </ul>
//         </div>
//       </div>
//     )
//   }
// }
const stateToProps = state => {
  // 映射，翻译器
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
const dispatchToProps = dispatch => {
  return {
    inputChange: e => {
      // 派发到 reducer ，reducer 里面处理
      // console.log(e.target.value)
      let action = {
        type: 'change_input',
        value: e.target.value
      }
      dispatch(action)
    },
    addItem: () => {
      let action = {
        type: 'addItem'
      }
      dispatch(action)
    }
  }
}
export default connect(stateToProps, dispatchToProps)(TodoList)
