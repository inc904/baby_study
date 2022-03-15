var express = require('express')
var app = express()
var fs = require('fs')
var template = require('art-template')
// 临时留言数据
var comments = [
  {
    name: '梅长苏',
    message: '问一哈，梅岭战役有没有其他幸存者。',
    dateTime: '102年9月9号'
  },
  {
    name: '乔峰',
    message: '天龙八部天下第一',
    dateTime: '2019年6月26日'
  }
]
app
  .use('/public', express.static('public'))
  .get('/', function(req, res){
    // res.send('this is my index page')
    fs.readFile('./views/index.html', function (err, data) {
      if (err) {
        // console.log('读取文件失败')
        return res.end('404 Not Found')
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.send(htmlStr)
    })
  })
  .get('/post', function(req, res){
    // res.send('this is my index page')    
    // 处理跳转发表留言
    fs.readFile('./views/post.html', function (err, data) {
      if (err) { return res.end('404') }
      res.end(data)
    })
  })
  .get('/pinglun', function(req, res){
    // res.send('this is comments page')
     // 处理提交评论
     var comment = req.query
     comments.unshift(comment)
     res.statusCode = 302
     res.setHeader('Location', '/')
     res.end()
  })
  .listen(3000, function(){
  console.log('server is runing at port 3000')
  })