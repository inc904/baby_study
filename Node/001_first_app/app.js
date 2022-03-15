const data = require('./data.json')
const http = require('http')
// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end(data)
//   })
//   .listen(9000)
// console.log('Server running at http://127.0.0.1:9000/')

http
  .createServer(function (request, response) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' })

    // 发送响应数据 "Hello World"
    // response.end('Hello World\n')
    response.end(JSON.stringify(data))
  })
  .listen(8888)

// 终端打印如下信息
console.log(data)
console.log(JSON.stringify(data))
console.log('Server running at http://127.0.0.1:8888/')
