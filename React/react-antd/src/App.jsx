import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'

import Dog from '@/components/dog'
import Person from '@/components/person.jsx'
import Coments from '@/components/comments'
import Counter from '@/components/counter'

let dog = {
  name: '巴鲁',
  age: 3,
  gender: 'male'
}
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HashRouter>
        <div>
          <h1>这是网站的App跟组件</h1>
          {/* 链接 */}
          <Link to="/dog" {...dog}>
            Dog
          </Link>
          <Link to="/person/henan/003">Person</Link>
          <Link to="/coments">Coments</Link>
          <Link to="/counter">Counter</Link>
          {/* 路由规则 */}
          <Route path="/dog" component={Dog}></Route>
          <Route path="/person/:province/:id" component={Person}></Route>
          <Route path="/coments" component={Coments}></Route>
          <Route path="/counter" component={Counter}></Route>
        </div>
      </HashRouter>
    )
  }
}
export default App
