import React, { Component } from 'react'
// import { HeaderWrapper, Logo } from './header_style'
import './header.scss'
export default class Header extends Component {
  render() {
    return (
      <div className="headerWrapper">
        <div className="header">
          <a className="logo" href="/">
            简书
          </a>
          <div className="nav">
            <ul className="navbar">
              <li className="tab ">
                <a href="/">发现</a>
              </li>
              <li className="tab ">
                <a href="/">关注</a>
              </li>
              <li className="tab ">
                <a href="/">消息</a>
              </li>
              <li className="tab ">
                <a href="/">搜索</a>
              </li>
            </ul>
            <ul className="user-action"></ul>
          </div>
        </div>
      </div>
    )
  }
}
