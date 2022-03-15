import React, { Component, Fragment } from 'react'

export default class TodoInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  // handleInputChange = e => {
  //   this.setState({
  //     value: e.currentTarget.value
  //   })
  // }
  handleInputChange(e) {
    this.setState({
      value: e.currentTarget.value
    })
  }
  handleAdd = () => {
    this.props.addItem(this.state.value)
    this.setState({
      value: ''
    })
  }
  render() {
    return (
      <Fragment>
        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)}
        />
        <input type="button" value="增加" onClick={this.handleAdd} />
      </Fragment>
    )
  }
}
