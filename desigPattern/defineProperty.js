var a = {}
Object.defineProperty(a, 'b', {
  value: 12
})
Object.defineProperty(a,
  'c', {
    value: 14,
    enumerable: true
  })
a.c = 233
console.log(a, a.c)	
for (let key in a) {
  console.log(key)
}
console.log(Object.keys(a))

var arr = [1,2,3,'a','hello']
for (let i in arr){
	console.log(i,arr[i])
}
for(let item of arr){
	console.log(item)
}