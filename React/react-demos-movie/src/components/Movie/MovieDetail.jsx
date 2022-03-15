import React from 'react'
import { Button, Icon } from 'antd'
import fetchJSONP from 'fetch-jsonp'
import fetchJsonp from 'fetch-jsonp'
export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {}
    }
  }
  UNSAFE_componentWillMount() {
    console.log('Props', this.props)

    // 'http://api.douban.com/v2/movie/subject/:id'
    fetchJsonp(
      `http://api.douban.com/v2/movie/subject/${this.props.match.params.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`
    )
      .then(res => res.json())
      .then(data => {
        console.log('data1:', data)
        this.setState({
          info: data
        })
        console.log('123', this.state.info.title)
      })
  }
  render() {
    return (
      <div>
        <h1>MovieDetail--{this.props.match.params.id}</h1>
        <Button type="primary" onClick={this.goBack}>
          <Icon type="left" />
          返回电影列表
        </Button>
        <h2>{this.state.info.title}</h2>
        {console.log('1233', this.state.info.title)}
        {/* <img src={this.state.info.images.large} alt="" /> */}
        {console.log('9090', this.state.info.title)}
        {console.log('9091', this.state.info)}
        {/* {console.log(this.state.info.images.large)} */}
        <p>{this.state.info.summary}</p>
      </div>
    )
  }
  componentDidMount = () => {
    // console.log('DidMount', this.state.info.summary)
    console.log('ref', document.querySelector('h2'))
  }
  goBack = () => {
    this.props.history.go(-1)
  }
}
