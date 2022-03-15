// 1.加载 http 核心模块
var http = require('http')
// 2.创建一个 web 服务器
var server = http.createServer()
// 3.服务器提供服务：对数据的服务
/*
    发请求
    接受请求
    处理请求
    给个反馈（发送响应）
*/
// 注册 request 请求事件
// 当服务器请求过来，就会自动触发服务器的 request 事件，她然后执行回调处理函数
server.on('request', function(){
    console.log('收到客户端的请求了')
})
// 4. 绑定端口号，启动服务器
server.listen(3000, function(){
    console.log('服务器启动成功了，通过 http://localhost:3000 访问')
})
