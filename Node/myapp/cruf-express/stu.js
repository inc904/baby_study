/**
 * stu.js 
 * 数据操作模块
 * 操作文件中的数据，只处理数据，不关心业务
 */
const fs = require('fs')
var dbPath = './db.json'
/**
 * 获取所有学生列表
 * return []
 */
exports.find = function (cb) {
  fs.readFile(dbPath, function (err, data) {
    // JSON.parse(data).students
    if (err) { return cb(err) }
    cb(null, JSON.parse(data).students)
  })
}
/**
 * 获取 单个学生信息
 *
 * @param {*} id 学生id
 * @param {*} cb 回调函数
 */
exports.findById = function (id, cb) {
  fs.readFile(dbPath, function (err, data) {
    if (err) { return cb(err) }
    var students = JSON.parse(data).students
    var ret = students.find(function(item){
      return item.id === parseInt(id)
    })
    cb(null, ret)
  })
}

/**
* 添加保存学生信息
*/
exports.save = function (student, cb) {
  fs.readFile(dbPath, function (err, data) {
    // JSON.parse(data).students
    if (err) { return cb(err) }
    var students = JSON.parse(data).students
    // if(students.length === 0){
    //   // return console.log(111)
    //   student.id = 0
    // }else{
    //   student.id = students[students.length - 1].id + 1 
    //   // return console.log(students.length)
    // }
    students.length === 0 ?  student.id = 0 : student.id = students[students.length - 1].id + 1 
    students.push(student)
    var fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return cb(err)
      }
      cb(null)
    })
  })
}

/**
* 更新学生信息
*/
exports.updateById = function (student, cb) {
  fs.readFile(dbPath, function (err, data) {
    // JSON.parse(data).students
    if (err) { return cb(err) }
    var students = JSON.parse(data).students
    student.id = parseInt(student.id)
    // ES6 find 方法
    var stu = students.find(function(item){
      return item.id === student.id
    })
    // 遍历拷贝对象
    for(var key in student){
      stu[key] = student[key]
    }
    var fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return cb(err)
      }
      cb(null)
    })
  })
 }
// updateById({id: id},function(err){})
/**
* 删除学生信息
*/
exports.deleteById = function (id, cb) { 
  fs.readFile(dbPath, function (err, data) {
    // JSON.parse(data).students
    if (err) { return cb(err) }
    var students = JSON.parse(data).students
    var deStu = students.findIndex(function(item){
      return item.id === parseInt(id)
    })
    students.splice(deStu, 1)
    var fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return cb(err)
      }
      cb(null)
    })
  })
}

