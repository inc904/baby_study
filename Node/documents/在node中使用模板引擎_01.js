var template = require('art-template')
var http = require('http')
var tplStr = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <p>大家好，我是{{ name }}</p>
        <p>我今年{{ age }} 岁了</p>
        <h1>我来自{{ province }}</h1>
        <p>我喜欢{{each hobbies}} {{ $value }} {{/each}}</p>
        <p>我是p标签</p>
        <p>hello {{ name }}</p>
    </body>
    </html>
`
var ret = template.render(tplStr, {
    name: 'jack',
    age: 18,
    province: '荷兰',
    hobbies: ['吃饭', '睡觉', '打豆豆']
})
// console.log(res)

var server = http.createServer()
server.on('request',function(res, req){
    req.end(ret)
})
server.listen(3000, function(){
    console.log('Runing....')
})
