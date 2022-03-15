import React from 'react'
import './dog.css'

export default function Dog(props) {
  return (
    <div>
      <p className="title">这是dog组件:无状态组件</p>
      <ul>
        <li>{props.name}</li>
        <li>{props.age}</li>
        <li>{props.gender}</li>
      </ul>
      <div className="box"></div>
      <img src="/images/GitHub.jpg" alt="" />
      {/* <img src="../images/GitHub.jpg" alt="" /> */}
    </div>
  )
}
