// 引包
var express = require('express')
// 创建服务器，相当于 http.caeateServer()
var app = express()

// 当服务器收到 get 请求 / 的时候，执行回调函数
app.get('/', function (req, res) {
  res.send('hello Express!')
})
app.get('/about', function (req, res) {
  res.send('你好，我是Express。')
})

// 开放静态资源
// 这样访问路径是 localhost:3000/a.txt 不需要带 /public就可以访问目录中的文件了
// app.use(express.static('./public/'))
app.use('/p/', express.static('./public')) // 这样访问路径是 localhost:3000/p/a.txt

// 相当于 server.listen()
app.listen(3000, function () {
  console.log('Server is runing at port 3000')
})
