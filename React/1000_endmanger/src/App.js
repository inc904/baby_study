import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { adminRoutes } from './routers'
import { Frame } from './components'

class App extends Component {
  render() {
    console.log(adminRoutes)
    return (
      <Frame>
        <Switch>
          {adminRoutes.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                exact
                render={routerProps => {
                  return <route.component {...routerProps} />
                }}
              />
            )
          })}
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    )
  }
}

// export default App
// export default testHOC(App)
export default App
