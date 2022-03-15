import React, { Fragment } from 'react'
class TodoHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    {
      console.log(this.props)
    }
    return (
      <Fragment>
        <h1>{this.props.children}</h1>
        <h2>{this.props.desc}</h2>
      </Fragment>
    )
  }
}
export default TodoHeader
