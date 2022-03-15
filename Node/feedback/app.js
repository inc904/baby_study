var http = require('http')
var fs = require('fs')
var url = require('url')

var template = require('art-template')
// 临时留言数据
var comments = [
  {
    name: '梅长苏',
    message: '问一哈，梅岭战役有没有其他幸存者。',
    dataTime: '102年9月9号'
  },
  {
    name: '乔峰',
    message: '天龙八部天下第一',
    dataTime: '2019年6月26日'
  }
]
// server.on('request', function(res,req){})
// 简写方式
http
  .createServer(function (request, response) {
    var parseObj = url.parse(request.url, true)
    var pathname = parseObj.pathname

    response.setHeader('content-type', 'text/html;charset=utf-8')
    if (pathname === '/') {
      // 处理首页
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          // console.log('读取文件失败')
          return response.end('404 Not Found')
        }
        var htmlStr = template.render(data.toString(), {
          comments: comments
        })
        response.end(htmlStr)
      })
    } else if (pathname === '/post') {
      // 处理跳转发表留言
      fs.readFile('./views/post.html', function (err, data) {
        if (err) { return response.end('404') }
        response.end(data)
      })
    }else if( pathname === '/pinglun'){
      // 处理提交评论
      var comment = parseObj.query
      comments.unshift(comment)
      response.statusCode = 302
      response.setHeader('Location', '/')
      response.end()
      // console.log('received request:', parseObj.query)
      
    }else if (pathname.indexOf('/public/') === 0) {
      // 处理静态资源
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return response.end('404 Not Found')
        }
        response.setHeader('content-type', 'text/css;charset=utf-8')
        response.end(data)
      })
    } else (
      // 处理错误页面
      fs.readFile('./views/404.html', function (err, data) {
        if (err) { return response.end('404') }
        response.end(data)
      })
    )
  }).listen(3000, function () {
    console.log('Srever is Runing...')
  })