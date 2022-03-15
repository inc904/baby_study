import React, { Component } from 'react'
import TodoItem from './TodoItem'
export class TodoList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('listProps', this.props)
    const { onCompeletedChange, todos } = this.props
    const unfinshTodo = todos.filter(item => {
      return item.completed === false
    })

    console.log('todos:', todos)
    console.log('unfinshTodo:', unfinshTodo)

    return (
      <div>
        <ul>
          {todos.map(item => {
            return (
              <TodoItem
                {...item}
                onCompeletedChange={onCompeletedChange}
                key={item.id}
              ></TodoItem>
            )
          })}
        </ul>
        <span>
          {unfinshTodo.length === 0
            ? '恭喜!todos are clean!'
            : `${unfinshTodo.length}items left.`}{' '}
        </span>
      </div>
    )
  }
}

export default TodoList
