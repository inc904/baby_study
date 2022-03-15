import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
    // const
    this.state = {
      todo: this.props
    }
  }
  handleCheckbox = () => {
    const { onCompeletedChange, id } = this.props
    onCompeletedChange(id)
    // console.log(this.props)
    // this.props.onCompeletedChange()
  }
  render() {
    return (
      <li>
        <input
          type="checkbox"
          checked={this.props.completed}
          onChange={this.handleCheckbox}
        />
        {this.props.title}
        <i style={{ color: ' #ccc', marginLeft: '5px' }}>
          {this.props.completed ? 'finished' : 'unfinsh'}
        </i>
      </li>
    )
  }
}
