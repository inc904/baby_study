import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from './App'
import './index.less'

import { mainRouter } from './routers'

ReactDOM.render(
  <Router>
    <Switch>
      <Route
        path="/admin"
        render={routerProps => {
          // TODO： 权限，需要权限才能访问 admin
          return <App {...routerProps} />
        }}
      />
      {mainRouter.map(route => {
        return (
          <Route
            path={route.pathname}
            component={route.component}
            key={route.pathname}
          />
        )
      })}
      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" />
    </Switch>
    {/* <App /> */}
  </Router>,
  document.getElementById('root')
)
