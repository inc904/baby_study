import React from 'react'

export default function Dog(props) {
  return (
    <div>
      <p>这是dog组件:无状态组件</p>
      <ul>
        <li>{props.name}</li>
        <li>{props.age}</li>
        <li>{props.gender}</li>
      </ul>
    </div>
  )
}
