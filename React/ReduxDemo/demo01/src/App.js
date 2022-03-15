import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import { Home, Artical, Users, ArticalDetail } from './views'
import TodoList from './TodoList'
import NewTodo from './NewTodo/newTodo'
import { Route, Link, Redirect } from 'react-router-dom'
import store from './NewTodo/store'

export default class App extends Component {
  render() {
    console.log(this.props)
    return (
      <Provider store={store}>
        <div>
          App
          <ul>
            <li>
              <Link to="/home">首页</Link>
            </li>
            <li>
              <Link to="/artical">文章</Link>
            </li>
            <li>
              <Link to="/users">用户</Link>
            </li>
            <li>
              <Link to="/todo">todolist</Link>
            </li>
            <li>
              <Link to="/newtodo">newTodo</Link>
            </li>
          </ul>
          <Route component={Home} path="/home" />
          <Route component={Artical} path="/artical" />
          <Route component={ArticalDetail} path="/artical/:id" />
          <Route component={Users} path="/users" />
          <Route component={TodoList} path="/todo" />
          <Route component={NewTodo} path="/newtodo" />
          <Redirect to="/home" from="/" />
        </div>
      </Provider>
    )
  }
}
