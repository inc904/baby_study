const template = require('art-template')
const http = require('http')
const fs = require('fs')
var ret = ''
fs.readFile('./tpl.html', function(err, data){
    if(err) {
        console.log('读取文件失败')
        return
    }
    ret = template.render(data.toString(), {
        name: 'jack',
        age: 18,
        province: '荷兰',
        hobbies: ['吃饭', '睡觉', '打豆豆']
    })
    // console.log(ret)
})


var server = http.createServer()
server.on('request',function(res, req){
    req.end(ret)
})
server.listen(3000, function(){
    console.log('Runing....')
})
