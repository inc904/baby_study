import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Button, Input, List } from 'antd'
import axios from 'axios'
import store from './store'
import {
  getInputChangeValueAction,
  addnewItemAction,
  deleteItemAction,
  initListAction,
  getInitSagaAction
} from './store/actionCreators'

export default class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    console.log(store.getState())
    store.subscribe(this.handleStoreChange) // 订阅 store 的改变
  }
  componentDidMount() {
    // axios
    //   .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    //   .then(res => {
    //     const data = res.data
    //     const action = initListAction(data)
    //     store.dispatch(action)
    //   })
    const action = getInitSagaAction()
    store.dispatch(action)
    console.log('saga', action)
  }
  handleInputChange = e => {
    console.log(e.target.value)
    const action = getInputChangeValueAction(e.target.value)
    store.dispatch(action)
  }
  handleAddItem = () => {
    const action = addnewItemAction()
    store.dispatch(action)
  }
  handleDeleteItem = index => {
    console.log('delete action', index)
    const action = deleteItemAction(index)
    store.dispatch(action)
  }
  handleStoreChange = () => {
    this.setState(store.getState())
  }
  render() {
    return (
      <div style={{ width: '400px', margin: '10px' }}>
        <Input
          placeholder="add a new todo"
          value={this.state.inputValue}
          style={{ width: '300px', marginRight: '10px' }}
          onChange={this.handleInputChange}
        ></Input>
        <Button type="primary" onClick={this.handleAddItem}>
          添加
        </Button>
        <div style={{ width: '300px', marginTop: '10px' }}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => {
              return (
                <List.Item onClick={this.handleDeleteItem.bind(this, item.id)}>
                  {item.title}
                </List.Item>
              )
            }}
          />
        </div>
      </div>
    )
  }
}
