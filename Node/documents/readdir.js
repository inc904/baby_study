var fs = require('fs')
fs.readdir('./', function(err, files){
    if(err){
      return  console.log('目录不存在')
    }
    console.log(files)
})