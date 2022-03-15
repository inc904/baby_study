var fs = require('fs')
var myFs = function (fsPath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fsPath, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
var p1 = myFs('./data/a.txt')
var p2 = myFs('./data/b.txt')
var p3 = myFs('./data/c.txt')

p1.then(function (data) {
  console.log(data)
  return p2
}, function (err) {
  console.log(err)
}).then(function (data) {
  console.log(data)
  return p3
}, function (err) {
  console.log(err)
}).then(function (data) {
  console.log(data)
}, function (err) {
  console.log(err)
})