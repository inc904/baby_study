var http = require('http')
var server = http.createServer()
server.on('request', function (request, response) {
  console.log('收到客户端的请求了')
  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.write('书生自愧拥书城')
  response.write('<br>')
  response.end('两字平安报与卿')
})
server.listen(3000, function () {
  console.log('服务器启动成功。点击 http://localhost:3000/ 访问')
})
