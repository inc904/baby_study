import React from 'react'

import MovieList from '@/components/Movie/MovieList'
import MovieDetail from '@/components/Movie/MovieDetail'

// 布局相关
import { Layout, Menu } from 'antd'
const { Header, Content, Sider } = Layout

// 路由相关
import { Link, Route, Switch } from 'react-router-dom'

export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  UNSAFE_componentWillMount() {
    console.log(window.location.hash.split('/')[2])
    // fetch()
  }
  render() {
    return (
      <Layout style={{ background: '#fff', height: '100%' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.hash.split('/')[2]]}
            style={{ height: '100%' }}
          >
            <Menu.Item key="in_theaters">
              <Link to="/movie/in_theaters/1">正在热映</Link>
            </Menu.Item>
            <Menu.Item key="coming_soon">
              <Link to="/movie/coming_soon/1">即将上映</Link>
            </Menu.Item>
            <Menu.Item key="top250">
              <Link to="/movie/top250/1">Top250</Link>
              50
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '10px 24px', minHeight: 280 }}>
          {/* 从路由规则中提取参数： this.props.match.params */}
          <Switch>
            <Route
              exact
              path="/movie/detail/:id"
              component={MovieDetail}
            ></Route>
            <Route
              exact
              path="/movie/:type/:page"
              component={MovieList}
            ></Route>
          </Switch>
        </Content>
      </Layout>
    )
  }
}
