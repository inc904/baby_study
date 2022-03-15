import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import { inject, observer } from 'mobx-react'
// const data = ['time 8, coding', 'time 9, meeting', 'time 10, sleeping']

@inject('store')
@observer
class NewTodo extends Component {
  constructor(props) {
    super(props)
    let { store } = this.props
    this.state = {
      store
    }
  }
  render() {
    let { store } = this.state
    return (
      <div>
        <p>new todo123 使用 mobx</p>
        <p>{store.time}</p>
        <div>
          <div style={{ margin: '10px' }}>
            <Input
              placeholder={store.inputValue}
              style={{ width: '300px', marginRight: '10px' }}
              onChange={e => {
                store.changeInputValue(e.target.value)
              }}
              value={store.inputValue}
            />
            <Button type="primary" onClick={store.addTodo}>
              添加
            </Button>
            <div style={{ marginTop: '10px', width: '300px' }}>
              <List
                bordered
                dataSource={store.todos}
                renderItem={(item, index) => (
                  <List.Item
                    onClick={() => {
                      store.deleteTodo(index)
                    }}
                  >
                    {item}
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default NewTodo
