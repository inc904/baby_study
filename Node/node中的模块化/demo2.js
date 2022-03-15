function init(){
  var out = {
    inner : {
      name: 'abc'
    }
  }
  inner = out.inner
  inner.a = 123
  inner = {}
  console.log(inner)
  return out.inner
}
init()