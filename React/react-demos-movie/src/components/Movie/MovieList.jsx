import React from 'react'
// UI 组件
import { Spin, Alert, Pagination } from 'antd'

//  导入 fetchJSONP
import fetchJSONP from 'fetch-jsonp'

//
import MovieItem from './movieItem'
import { ReactType } from 'prop-types'
export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      title: '',
      currentPage: parseInt(props.match.params.page) || 1,
      pageSize: 20,
      total: 0,
      isLoading: true, // 是否正在加载数据
      movieType: props.match.params.type
    }
  }
  UNSAFE_componentWillMount() {
    // setTimeout(() => {
    //   this.setState({
    //     isLoading: false
    //   })
    // }, 1000)
    this.loadMovieListByTypeAndPage()
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.match)
    this.setState(
      {
        isLoading: true,
        currentPage: parseInt(nextProps.match.params.page) || 1,
        movieType: nextProps.match.params.type
      },
      function() {
        this.loadMovieListByTypeAndPage()
      }
    )
  }

  render() {
    return (
      <div>
        {/* MovieList--
        {this.props.match.params.type}--
        {this.props.match.params.page} */}
        {this.renderList()}
      </div>
    )
  }
  loadMovieListByTypeAndPage() {
    const apikey = '0df993c66c0c636e29ecbb5344252a4a'
    let start = this.state.pageSize * (this.state.currentPage - 1)
    const URL = `http://api.douban.com/v2/movie/${this.state.movieType}?apikey=${apikey}&start=${start}&count=${this.state.pageSize}`
    // 加载电影数据
    // 'http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'

    fetchJSONP(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          isLoading: false,
          movies: data.subjects,
          total: data.total,
          title: data.title
        })
      })
    // const data = require('@/test_data/' + this.state.movieType + '_data.json')
    // setTimeout(() => {
    //   this.setState({
    //     isLoading: false,
    //     movies: data.subjects,
    //     total: data.total,
    //     title: data.title
    //   })
    // }, 1000)
  }
  renderList() {
    // 渲染电影列表
    if (this.state.isLoading) {
      return (
        <Spin tip="加载中...">
          <Alert
            message="正在请求电影列表"
            description="精彩内容马上呈现。"
            type="info"
          />
        </Spin>
      )
    } else {
      return (
        <div>
          <h1>{this.state.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {this.state.movies.map(item => {
              return (
                <MovieItem
                  {...item}
                  history={this.props.history}
                  key={item.id}
                ></MovieItem>
              )
            })}
          </div>
          <Pagination
            defaultCurrent={this.state.currentPage}
            total={this.state.total}
            onChange={this.pageChanged}
            pageSize={20}
          />
        </div>
      )
    }
  }
  pageChanged = page => {
    // window.location.href = '/#/movie/' + this.state.movieType + '/' + page
    this.props.history.push(`/movie/${this.state.movieType}/page`)
  }
}
