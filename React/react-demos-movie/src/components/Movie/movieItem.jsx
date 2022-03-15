import React from 'react'
import '@/css/movie_item.scss'
import { Rate } from 'antd'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="movieItem" onClick={this.goDetali}>
        <img src={this.props.images.small} alt="" />
        <h4>电影名称: {this.props.title}</h4>
        <h4>上映年份: {this.props.year}年</h4>
        <h4>电影类型: {this.props.genres.join(',')}</h4>
        <Rate disabled defaultValue={this.props.rating.average / 2} />
      </div>
    )
  }
  goDetali = () => {
    console.log(123)
    console.log(this.props)
    this.props.history.push(`/movie/detail/${this.props.id}`)
  }
}
