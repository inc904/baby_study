function ad(cb){
  setTimeout(function(){
    var a = 100
    cb(a)
  }, 3000)
}
ad(function(data){
  console.log(data)
})