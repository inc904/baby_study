var fs = require('fs')
var p1 = new Promise(function (resolve, reject) {
  fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})
var p2 = new Promise(function (resolve, reject) {
  fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})
var p3 = new Promise(function (resolve, reject) {
  fs.readFile('./data/c.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})
p1.then(
  function (data) {
    console.log(data)
    return p2
  },
  function (err) {
    console.log(err)
  }
)
  .then(
    function (data) {
      console.log(data)
      return p3
    },
    function (err) {
      console.log(err)
    }
  )
  .then(
    function (data) {
      console.log(data)
    },
    function (err) {
      console.log(err)
    }
  )
