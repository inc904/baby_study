import React from 'react'
import { DatePicker } from 'antd'

export default class Person extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <p>这是person组件</p>
        <ul>
          <li>{this.props.name}</li>
          <li>{this.props.age}</li>
          <li>{this.props.gender}</li>
          <li>{this.props.match.params.id}</li>
          <li>{this.props.match.params.province}</li>
          {console.log(this.props.match.params)}
        </ul>
        <DatePicker></DatePicker>
      </div>
    )
  }
}
