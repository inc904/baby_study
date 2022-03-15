import React from 'react'
import { func } from 'prop-types'
function CmtItem(props) {
  return (
    <div>
      <p>评论人：{props.name}</p>
      <p>评论内容：{props.content}</p>
    </div>
  )
}
class SubmitComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cmt: props.cmt
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.cmt}</p>
        <input type="text" value={this.state.cmt} onChange={this.handleInput} />
        <input type="button" value="发表评论" />
      </div>
    )
  }
  handleInput = e => {
    console.log(e.target.value)
    // this.setState({

    // })
  }
}
class Comments extends React.Component {
  constructor() {
    super()
    this.state = {
      commentsLIst: [
        { name: 'js', content: 'hh11' },
        { name: 'js2', content: 'hh112' },
        { name: 'js3', content: 'hh113' }
      ],
      cmt: '请输入评论'
    }
  }
  render() {
    return (
      <div>
        <SubmitComment cmt={this.state.cmt}></SubmitComment>
        <h1 style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>
          评论列表
        </h1>
        {this.state.commentsLIst.map(item => (
          <CmtItem {...item} key={item.name}></CmtItem>
        ))}
      </div>
    )
  }
}
export default Comments
