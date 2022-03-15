import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
@inject('store')
@observer
class TodoList extends Component {
  render() {
    let { store } = this.props
    return (
      <div>
        <p>时间:{store.time}</p>
        <input
          type="text"
          value={store.inputValue}
          placeholder="add new tood"
          onChange={e => {
            store.changeInput(e.target.value)
          }}
        />
        <input type="button" value="添加" onClick={store.addTodo} />
        <div>
          <ul>
            {store.todos.map((ele, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    store.delTodo(index)
                  }}
                >
                  {ele}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default TodoList
