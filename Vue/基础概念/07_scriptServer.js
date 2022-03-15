const http = require('http')
const URL = require('url')
const server = http.createServer(function (req, res) {
  // res.end('successful')
  const url = req.url
  var urlObj = URL.parse(url, true)

  console.log(urlObj)
  if (urlObj.pathname === '/getScript') {
    console.log(typeof urlObj.query.cb)
    res.end(`${urlObj.query.cb}()`)
  } else {
    res.end('404')
  }
})
server.listen(3000, function () {
  console.log('runing at 3000')
})