/**
 * app.js 入口模块
 * 职责：
 *  创建服务
 * 做一下服务相关配置
 *  模板引擎的配置
 *  body-parser 解析表单
 *  提供静态资源服务
 * 挂载路由
 * 监听端口 启动服务
 */

const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

var app = express()
app.engine('html', require('express-art-template'))

app.use('/node_modules/', express.static('./node_modules'))
app.use('/public/', express.static('./public'))

/**
 * 配置 body-parser 处理 post 请求
 * 注意： 一定在 配置路由之前 配置 中间件
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// router(app) 第一种方法

// 把路由容器挂载到 APP 服务中
app.use(router)

app.listen(3000, function () {
  console.log('runing at port 3000')
})
