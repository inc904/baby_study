var express = require('express')
var app = express()
var bodyParser = require('body-parser')
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
// 配置 模板迎引擎
// 第一个参数表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎 
// app.engine('art', require('express-art-template')) 
app.engine('html', require('express-art-template'))
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})

// 配置 body-parser 中间件，用来解析 表单 post 请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parser application/json
app.use(bodyParser.json())
/**
 * Express 为 response 响应对象 提供了一个方法： render
 * render 方法默认是不可使用的，但是如果配置了模板引擎就可以使用了
 * response.render('html模板名', { 模板数据 })
 * 第一个参数 不能写路径，默认会去 项目中 的 views 目录中查找该模板文件
 * 也就是说 Express 约定，开发人员默认把 视图文件 都放在 views 目录中
 * 修改默认 views 目录 ：
 *  app.set('views', './public/') // 这就将 public 作为默认视图文件 存储目录
 */
// 开放静态资源目录
app.use('/public', express.static('public'))
// 路由设置
app
  .get('/', function (req, res) {
    // res.send('this is my index page')
    // fs.readFile('./views/index.html', function (err, data) {
    //   if (err) {
    //     // console.log('读取文件失败')
    //     return res.end('404 Not Found')
    //   }
    //   var htmlStr = template.render(data.toString(), {
    //     comments: comments
    //   })
    //   res.send(htmlStr)
    // })
    res.render('index.html', {
      comments: comments
    })
  })
  .get('/post', function (req, res) {
    // res.send('this is my index page')    
    // 处理跳转发表留言
    // fs.readFile('./views/post.html', function (err, data) {
    //   if (err) { return res.end('404') }
    //   res.end(data)
    // })
    res.render('post.html')
  })
// post 请求 评论页面
app.post('/pinglun', function (req, res) {
  /**
   * 1.获取表单
   * 2.处理
   * 3.发送响应
   */
  var comment = req.body
  comment.dateTime = '2019-06-29'
  comments.unshift(comment)
  res.redirect('/')
})
  // get 请求表单
  // app.get('/pinglun', function(req, res){
  //   // res.send('this is comments page')
  //    // 处理提交评论
  //    var comment = req.query
  //    comment.dateTime = '2019-06-29'
  //    comments.unshift(comment)
  //   //  res.statusCode = 302
  //   //  res.setHeader('Location', '/')
  //   //  res.end()
  //   // express 方法 替代
  //   res.redirect('/')
  // })
  .listen(4000, function () {
    console.log('server is runing at port 4000')
  })