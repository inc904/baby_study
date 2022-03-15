import React from 'react'
import ReactTypes from 'prop-types'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: props.initNum,
      msg: 'hhh'
    }
  }

  static defaultProps = {
    initNum: 0
  }
  static propTypes = {
    initNum: ReactTypes.number
  }

  UNSAFE_componentWillMount() {
    // 组件即将挂载到页面上执行，组件尚未挂载，虚拟dom尚未创建
    // 不可以 获取页面上的元素
    //  等同于 Vue 中 created 生命周期钩子函数
  }
  render() {
    // 开始渲染虚拟DOM
    // return 之前，虚拟DOM还未创建，拿不到页面元素
    return (
      <div>
        {/* <input type="button" value="+1" id="btn" /> */}
        <input
          type="button"
          value="+1"
          id="btn"
          onClick={() => this.increment()}
        />
        <hr />
        <p ref="btn-p">加一之后的值：{this.state.num}</p>
        <p>{this.state.msg}</p>
        <input
          type="text"
          value={this.state.msg}
          ref="inp"
          onChange={e => {
            this.handleInp(e)
          }}
        />
      </div>
    )
    // return 执行完毕，虚拟DOM 创建完成，但是页面上，还没有挂载
  }
  // 自己的函数
  increment = e => {
    this.setState({
      num: this.state.num + 1
    })
  }
  handleInp(e) {
    // console.log(e.target.value)
    // console.log(this.refs.inp.value)
    this.setState({
      msg: e.target.value
    })
  }
  componentDidMount() {
    // 组件挂载到页面上之后，执行这个生命周期函数，页面上已经有可见的DOM元素
    // 可以操作 页面上的 DOM 元素
    // 相当于 Vue 中的 mounted 函数
    // document.getElementById('btn').onclick = () => {
    //  原生 js 实现
    //   this.setState({
    //     num: this.state.num + 1
    //   })
    // }
    // 函数执行完毕之后，页面周期进入到 运行中
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  UNSAFE_componentWillUpdate() {
    // 组件将要更新，内存中的虚拟DOM和页面上的DOM元素都是旧的
  }
  // 执行完更新函数，再次执行 render 函数，渲染虚拟DOM和页面
  componentDidUpdate() {
    // 执行完 update 函数，内存中的DOM 和 页面都是最新的
    console.log(this.refs['btn-p'].innerHTML)
  }
}

export default Counter
