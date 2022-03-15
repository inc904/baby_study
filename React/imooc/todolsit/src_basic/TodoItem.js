import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleDelete = () => {
    this.props.deleteItem(this.props.index)
    console.log(1)
    console.log(this.props)
  }
  render() {
    console.log(this.props)
    // const { item } = this.props
    const { item: content } = this.props

    return (
      <li
        style={{ border: '1px #ccc solid', margin: '5px' }}
        onClick={this.handleDelete}
      >
        {content}
      </li>
    )
  }
}
