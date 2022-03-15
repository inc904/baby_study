import React from 'react'
import ReactDOM from 'react-dom'

const mydiv = React.createElement('div', { id: 'box' }, 'this is a div box!')
// let div2 = <div></div>
ReactDOM.render(mydiv, document.getElementById('app'))
