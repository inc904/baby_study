// 1.加载 http 核心模块
var http = require('http')
// 2.创建一个 web 服务器
var server = http.createServer()
// 3.服务器提供服务：对数据的服务

// 注册 request 请求事件
// 当服务器请求过来，就会自动触发服务器的 request 事件，她然后执行回调处理函数
var products = [
    {
        name: '魅族X8',
        price: '1499'
    },
    {
        name: '小米X8',
        price: '1499'
    },
    {
        name: '华为X8',
        price: '1499'
    }
]
server.on('request', function (request, response) {
    console.log('收到客户端的请求了,请求路径是' + request.url)
    // response对象的方法，给客户端发送相应数据
    // write 可以使用多次，但是最后一定要 使用 end 结束
    // response.write('it is  start')
    // response.end('it is end')
    switch (request.url) {
        case '/':
            console.log('主页请求')
            response.end('index page')
            break;
        case '/login':
            console.log('登录请求')
            response.end('login page')
            break;
        case '/pd':
                console.log('商品请求')
                response.write(JSON.stringify(products))
                response.end()
                break;
    }
})
// 4. 绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功了，通过 http://localhost:3000 访问')
})
