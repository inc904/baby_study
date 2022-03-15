import React from 'react'
import { Provider } from 'mobx-react'
import store from './store'
import TodoList from './page/TodoList'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        home
        <TodoList />
      </div>
    </Provider>
  )
}

export default App
