import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
// const data = ['time 8, coding', 'time 9, meeting', 'time 10, sleeping']
import store from './store'
// import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './store/actionTypes'
import {
  changeInputAction,
  addItemAction,
  deleteItemAction
} from './store/actionCreators'
export default class TodoList extends Component {
  constructor(props) {
    super(props)
    console.log('store:', store.getState())
    this.state = store.getState()
    // this.changeInputValue = this.changeInputValue.bind(this) // 改变 this 指向
    store.subscribe(this.stateChange) // 订阅
  }
  stateChange = () => {
    this.setState(store.getState())
  }
  changeInputValue = e => {
    // const action = {
    //   type: CHANGE_INPUT,
    //   value: e.target.value
    // }
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
  }
  clickBtn = () => {
    // console.log(123)
    // const action = {
    //   type: ADD_ITEM
    // }
    const action = addItemAction()
    store.dispatch(action)
  }
  deleteItem = index => {
    // console.log(index)
    // const action = {
    //   type: DELETE_ITEM,
    //   value: index
    // }
    const action = deleteItemAction(index)
    store.dispatch(action)
  }
  render() {
    return (
      <div>
        <div style={{ margin: '10px' }}>
          <Input
            placeholder={this.state.inputValue}
            style={{ width: '300px', marginRight: '10px' }}
            onChange={this.changeInputValue}
            value={this.state.inputValue}
          />
          <Button type="primary" onClick={this.clickBtn}>
            添加
          </Button>
          <div style={{ marginTop: '10px', width: '300px' }}>
            <List
              bordered
              dataSource={this.state.list}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => {
                    this.deleteItem(index)
                  }}
                >
                  {item}
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    )
  }
}
