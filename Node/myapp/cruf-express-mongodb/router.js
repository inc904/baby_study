/**
 * router.js 路由模块
 * 处理路由
 * 根据不同的请求方法 + 请求路径 设置具体的请求处理函数
 *
 */
var express = require('express')
var router = express.Router()
var stu = require('./stu')
// 渲染首页
router.get('/students', function (req, res) {
  stu.find(function (err, data) {
    if (err) {
      return res.status(500).send('Server Error')
    }
    res.render('index.html', {
      students: data,
    })
  })
})
// 渲染 添加学生页面
router.get('/students/new', function (req, res) {
  res.render('new.html')
})
// 提交学生信息
router.post('/students/new', function (req, res) {
  new stu(req.body).save(function (err, ret) {
    if (err) {
      console.log('保存失败')
    } else {
      console.log('保存成功')
      console.log(ret)
    }
  })
  res.redirect('/students')
})
// 渲染修改学生信息页面
router.get('/students/edit', function (req, res) {
  // console.log(req.query.id)
  stu.findOne({ _id: req.query.id }, function (err, student) {
    if (err) {
      return res.status(500).send('Server Error')
    }
    // console.log(student)
    res.render('edit.html', { student: student })
  })
})
// 提交修改学生信息
router.post('/students/edit', function (req, res) {
  // 1. 获取表单数据 req.body
  // 2. 更新
  stu.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      return 500
    }
    // 3. 发送响应
    res.redirect('/students')
  })
})
// 删除学生信息
router.get('/students/delete', function (req, res) {
  // 1.获取要删除的 id ： req.id
  // 2. 执行删除操作
  // 3. 发送响应数据，刷新页面
  // console.log(req.query.id)
  stu.deleteOne({ _id: req.query.id }, function (err, data) {
    if (err) {
      return 500
    }
    res.redirect('/students')
  })
})
module.exports = router
