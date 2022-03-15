import React, { Component } from 'react'

export class TodoInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }
  hanleInputChange = e => {
    this.setState({
      inputValue: e.currentTarget.value
    })
  }
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleAddNewTodo()
    }
  }
  handleAddNewTodo = () => {
    this.props.setNewTodo(this.state.inputValue)
    this.state.inputValue = ''
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.hanleInputChange}
          placeholder="New Todo"
          onKeyUp={this.handleKeyUp}
        />
        <button onClick={this.handleAddNewTodo} ref="inpBtn">
          Add NewTodo
        </button>
      </div>
    )
  }
}

export default TodoInput
