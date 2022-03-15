var mongoose = require('mongoose')

var Schema = mongoose.Schema
// 1.连接数据库
// 如果自定的数据库不存在，当你插入第一条数据的时候会自动被创建出来
mongoose.connect('mongodb://localhost/itcast', { useNewUrlParser: true })

// 2.设计文档结构（表结构）
// 字段名称就是 结构中的 属性名称
// 约束的目的 是为了数据的完整性，不要有脏数据
var blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: String

})

// 3.mongoose.model() 方法就是将一个 架构 发布 为 model
// 第一个参数： 传入一个首字母大写的数字字符串来表示你的数据库的名称
// mongoose 会自动江湖大写名词的字符串 生成 小写复数 的集合名称
// 这里的 Blog 最终会变成 blogs 集合 名称
// 第二个参数： 架构 Schema
// 返回值 模型构造函数
var Blog = mongoose.model('Blog', blogSchema)

// 4. 操作集合 blogs 中的数据
// 新增数据
// var article = new Blog({
//   title: 'notnot',
//   author: 'zhangsan'
// })

// article.save(function(err, ret){
//   if (err) {
//     console.log('保存失败')
//   }else {
//     console.log('保存成功')
//     console.log(ret)
//   }
// })
// 查询数据

// 查询所有
Blog.find(function (err, data) {
  if (err) {
    console.log('查询失败')
  }
  console.log('查询成功')
  console.log(data)
})

// 条件查询
// Blog.find({title: 'first article'}, function (err, data) {
//   if (err) {
//     console.log('查询失败')
//   }
//   console.log('查询成功')
//   console.log(data)
// })

// 查询单个，只返回查询到的第一个数据

// Blog.findOne({title: 'first article'}, function (err, data) {
//   if (err) {
//     console.log('查询失败')
//   }
//   console.log('查询成功')
//   console.log(data)
// })

// 删除数据
// Blog.remove({title: 'notnot'}, function(err,data){
//   if(err) {
//     console.log('delete error')
//   }
// })
// 修改数据
// Blog.findOneAndUpdate({title: 'notnot'}, { title: 'goodgood'},function(err, data){
//   if(err){
//     console.log('update error')
//   }
//   console.log('success',data)
// })
// = other methods =
// Blog.findByIdAndUpdate()