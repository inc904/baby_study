import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './TodoApp'
import { Provider } from 'react-redux'
import store from './store'

const App = (
  <Provider store={store}>
    <TodoApp />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'))
