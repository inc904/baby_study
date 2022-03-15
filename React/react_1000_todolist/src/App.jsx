import React, { Fragment, Component } from 'react'
import { TodoHeader, TodoInput, TodoList } from './components'
import { func } from 'prop-types'

import { getTodos } from './server'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        { id: 1, title: '吃饭', completed: true },
        { id: 2, title: '睡觉', completed: false }
      ]
    }
  }
  setNewTodo = todoValue => {
    if (todoValue.trim() === '') return
    let newTodo = {
      id: Math.random(),
      title: todoValue,
      completed: false
    }
    this.setState({
      todos: this.state.todos.concat(newTodo)
    })
  }
  onCompeletedChange = id => {
    console.log(id)
    this.setState(
      prevState => {
        return {
          todos: prevState.todos.map(todo => {
            if (todo.id === id) {
              todo.completed = !todo.completed
            }
            return todo
          })
        }
      },
      function() {
        console.log(this.state)
      }
    )
  }
  componentDidMount() {
    getTodos()
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.setState({
            todos: response.data.splice(0, 5)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <Fragment>
        <TodoHeader desc="今日事，今日毕">待办事项</TodoHeader>
        <TodoInput setNewTodo={this.setNewTodo}></TodoInput>
        <TodoList
          todos={this.state.todos}
          onCompeletedChange={this.onCompeletedChange}
        ></TodoList>
      </Fragment>
    )
  }
}
