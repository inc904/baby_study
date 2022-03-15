const http = require('http');
var server = http.createServer(function(request, response){
    // console.log("有人来了");
    response.write('edf');
    response.end('abc');
});
// 监听
// server.on('request', function(){
//     console.log('收到客户端的请求了')
// })
server.listen(3000, function(){
    console.log('服务器启动成功了，点击http://localhost:3000/ 访问')
}); // 绑定端口号，启动服务器
