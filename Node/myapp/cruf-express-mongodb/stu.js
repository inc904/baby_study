/**
 * stu.js
 * 数据操作模块
 * 操作数据，只处理数据，不关心业务
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/school', { useNewUrlParser: true })
mongoose.set('useFindAndModify', true)

var studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  age: Number,
  hobbies: String,
})
module.exports = mongoose.model('Student', studentSchema)
