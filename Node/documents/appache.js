var http = require('http')
var fs = require('fs')
var wwwDir = 'E:/phpStudy/PHPTutorial/WWW/study/Node/documents'
var server = http.createServer()
server.on('request', function (request, response) {
    console.log('收到客户端的请求了。')
    response.setHeader('Content-type', 'text/html;charset=utf-8;')
    fs.readFile('./template.html', function (err, data) {
        if (err) {
            console.log(err)
            response.end('404')
            return
        }
        // 1. 如何得到目录列表中的文件名和目录名
        // 2. 如何将得到的文件名和目录名替换到 template-appache.html 中
        //      模板引擎
        fs.readdir(wwwDir, function (err, files) {
            if (err) {
                console.log(err)
                return response.end('找不到目录')
            }
            var content = ''
            files.forEach(function (item) {
                content += `
                <tr>
                    <td ><a class="icon dir" href="E:/phpStudy/PHPTutorial/WWW/study/Node/documents/${item}" >${item}/</a></td>
                    <td class="detailsColumn" data-value="0"></td>
                    <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
                </tr>
                `
            })
            console.log(files)
            // ['a.js',
            // 'a.txt',
            // 'appache.js',
            // 'img',
            // 'readdir.js',
            //     'template.html']
            data = data.toString()
            response.end(data.replace('^_^', content))
        })
    })
    var url = request.url
    fs.readFile(wwwDir + url, function(err, data){
        if(err){
           return console.log(err)
        }
        response.end(data)
    })

    // response.write('hello')
    // response.end('世界')
})
server.listen(3000, function () {
    console.log('服务器启动成功，点击 http://localhost:3000 访问')
})