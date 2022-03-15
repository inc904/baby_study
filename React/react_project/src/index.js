import React from 'react'
import ReactDOM from 'react-dom'

import Dog from './components/dog.jsx'
import Person from '@/components/person.jsx'
import Coments from '@/components/comments'
import Counter from '@/components/counter'
import App from '@/App'

const mydiv = React.createElement('div', { id: 'box' }, 'this is a div box!')
let num_a = 10,
  string_a = 'hello',
  boolean_a = true
let obj_node = <h3>我是一个小标题</h3>
let arr_nodeObj = [<h3>我是一个小标题2</h3>, <h3>我是一个小标题3</h3>]
let dog = {
  name: '巴鲁',
  age: 3,
  gender: 'male'
}
function Hello(props) {
  // function 关键字 实现组件
  return (
    <div>
      <p>这是hello组件</p>
      <ul>
        <li>{props.name}</li>
        <li>{props.age}</li>
        <li>{props.gender}</li>
      </ul>
    </div>
  )
}
// class 关键字创建组件 class 创建的组件叫 有状态组件， function 创建的组件 叫 无状态组件
// 有无状态的区别就是： 有没有 state；有没有 生命周期
class Movie extends React.Component {
  constructor() {
    super()
    this.state = {
      // 组件的 私有数据
      // this.state = {} 相当于 Vue 中的 data(){return {}}
      // this.state 中的数据都是可读可写的， props 中的数据都是只读的
      msg: '我是state中的数据'
    }
  }
  render() {
    return (
      <div>
        <p>这是Movie组件</p>
        <ul>
          {/* class 关键字 声明的组件， 使用外界传递的 props ， this.props.*** */}
          <li>{this.props.name}</li>
          <li>{this.props.age}</li>
          <li>{this.props.gender}</li>
          <li>{this.state.msg}</li>
        </ul>
      </div>
    )
  }
}

let div2 = (
  <div>
    this is div2
    {/* <h2>渲染标签</h2>
    <p>渲染标签</p>
    <p>渲染数字：{num_a + 2}</p>
    <p>渲染字符串：{string_a}</p>
    <p> 渲染布尔值：{boolean_a ? '真' : '假'}</p>
    <p title="0000000ooo">渲染属性：静态 p标签</p>
    <p title={string_a}>渲染属性：动态 p标签</p>
    <div>渲染jsx元素：{obj_node}</div>
    <div>渲染jsx数组：{arr_nodeObj}</div> */}
    <Hello {...dog}></Hello>
    <Dog {...dog}></Dog>
    <Person {...dog} />
    <Movie {...dog}></Movie>
  </div>
)
let div3 = <Counter initNum={3}></Counter>
let div4 = <Coments></Coments>

ReactDOM.render(<App></App>, document.getElementById('app'))
