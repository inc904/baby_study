const fs= require('fs')

module.exports = function (app) {
  app.get('/students', function(req, res){
    fs.readFile('./db.json', function(err, data){
      if(err) { 
        return res.status(500),send('Server Error')
      }
      res.render('index.html', {
        fruits: ['苹果','香蕉','橘子','榴莲'],
        students: JSON.parse((data.toString())).students
      })
    })
  })
  app.get('./students/new', function(req, res){
    
  })
  app.get('./students/new', function(req, res){
    
  })
  app.get('./students/new', function(req, res){
    
  })
  app.get('./students/new', function(req, res){
    
  })
  app.get('./students/new', function(req, res){
    
  })
}