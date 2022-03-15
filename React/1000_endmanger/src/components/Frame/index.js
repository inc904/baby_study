import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'

import logo from './end_logo.png'
import { adminRoutes } from '../../routers'
import { withRouter } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const menus = adminRoutes.filter(route => route.isNav === true)

@withRouter
class Frame extends Component {
  menuClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header
          className="header"
          style={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}
        >
          <div className="logo">
            <img src={logo} alt="logo" style={{ width: '180px' }} />
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[this.props.location.pathname]}
              onClick={this.menuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {menus.map(item => {
                return (
                  <Menu.Item key={item.pathname}>
                    <Icon type={item.icon} />
                    {item.title}
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default Frame
