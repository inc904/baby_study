import React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'
import '@/css/app.scss'

// antd
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

import Home from '@/components/Home/Home'
import About from '@/components/About/About'
import Movie from '@/components/Movie/Movie'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <HashRouter>
        <Layout className="layout" style={{ height: '100%' }}>
          <Header style={{ backgroundColor: '#edf4ed' }}>
            <div className="logo" />
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={[window.location.hash.split('/')[1]]}
              style={{ lineHeight: '64px', backgroundColor: '#edf4ed' }}
            >
              <Menu.Item key="home">
                <Link to="/home">首页</Link>
              </Menu.Item>
              <Menu.Item key="movie">
                <Link to="/movie/in_theaters/1">电影</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">关于</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div
              style={{
                background: '#fff',
                minHeight: 280,
                height: '100%'
              }}
            >
              <Route path="/home" component={Home}></Route>
              <Route path="/movie" component={Movie}></Route>
              <Route path="/about" component={About}></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            YTF React Study Project ©2020 Created by YTF
          </Footer>
        </Layout>
      </HashRouter>
    )
  }
}
