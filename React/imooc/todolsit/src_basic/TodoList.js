import React, { Component } from 'react'
import TodoItem from './TodoItem'
import TodoInput from './TodoInput'
export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: 'add something...',
      list: ['time 8 get up', 'time 9 eating']
    }
  }
  addItem = value => {
    if (value.trim() === '') return
    let newList = JSON.parse(JSON.stringify(this.state.list))
    newList.push(value)
    this.setState({
      list: newList
    })
  }
  deleteItem = index => {
    let newList = JSON.parse(JSON.stringify(this.state.list))
    newList.splice(index, 1)
    this.setState({
      list: newList
    })
  }
  render() {
    return (
      <div>
        <TodoInput
          placeholder={this.state.placeholder}
          addItem={this.addItem}
        />
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <TodoItem
                item={item}
                index={index}
                key={index}
                deleteItem={this.deleteItem}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}
