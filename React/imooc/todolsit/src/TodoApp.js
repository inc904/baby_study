import React, { Component } from 'react'
import { Input, Button, List } from 'antd'
import 'antd/dist/antd.css'
// import store from './store'
import { connect } from 'react-redux'
const TodoApp = props => {
  const {
    inputValue,
    handleInputChange,
    handleAddItem,
    list,
    deleteItem
  } = props
  return (
    <div style={{ margin: '20px' }}>
      <Input
        style={{ width: '300px', marginRight: '10px' }}
        placeholder="add new todo"
        value={inputValue}
        onChange={handleInputChange}
      ></Input>
      <Button type="primary" onClick={handleAddItem}>
        添加
      </Button>
      <List
        style={{ width: '300px', marginTop: '10px' }}
        bordered
        dataSource={list}
        renderItem={(item, index) => {
          return (
            <List.Item
              onClick={() => {
                deleteItem(index)
              }}
            >
              {item}
            </List.Item>
          )
        }}
      />
    </div>
  )
}
class TodoApp1 extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = store.getState()
  // }

  render() {
    const {
      inputValue,
      handleInputChange,
      handleAddItem,
      list,
      deleteItem
    } = this.props
    return (
      <div style={{ margin: '20px' }}>
        <Input
          style={{ width: '300px', marginRight: '10px' }}
          placeholder="add new todo"
          value={inputValue}
          onChange={handleInputChange}
        ></Input>
        <Button type="primary" onClick={handleAddItem}>
          添加
        </Button>
        <List
          style={{ width: '300px', marginTop: '10px' }}
          bordered
          dataSource={list}
          renderItem={(item, index) => {
            return (
              <List.Item
                onClick={() => {
                  deleteItem(index)
                }}
              >
                {item}
              </List.Item>
            )
          }}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  // 连接规则，把 state 中的数据 映射成组件的 props
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
const mapDispatchToProps = dispatch => {
  // store.dispatch 映射到 props 上
  return {
    handleInputChange(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action)
    },
    handleAddItem() {
      const action = {
        type: 'add_item'
      }
      dispatch(action)
    },
    deleteItem(index) {
      const action = {
        type: 'delete_item',
        value: index
      }
      dispatch(action)
    }
  }
}
// TodoApp 是一个UI组件，经过 connect 处理之后的结果，是一个 容器 组件
export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
