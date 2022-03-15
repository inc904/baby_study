import React from 'react'
import ReactDOM from 'react-dom'

const mydiv = React.createElement('div', { id: 'box' }, 'this is a div box!')
let div2 = <div>this si div2</div>
ReactDOM.render(div2, document.getElementById('app'))
