//1. call和apply的区别
// 都是用来改变 this 指向的，
// 都是原型的方法

// function fn(){}
// fn.call(obj, 10, 20, 30) // 参数单数传递
// fn.apply(obj, [10, 20, 30]) // 参数 以数组形式 传递

/*
性能:
  参数在三个和三个以内，都差不多
  参数在三个以上call的性能比apply好一些

bind 预先处理 this 指向 ，不立即执行

*/
let arr = [10, 20, 30],
  obj = {}

function fn(x, y, z) {
  console.log(arguments)
}

fn.apply(obj, arr) // --> x = 10, y = 20, z = 30
fn.call(obj, arr) // --> x = [10, 20, 30]
fn.call(obj, ...arr) // --> x = 10, y = 20, z = 30
// let t1 = new Date()
console.time('a')
for (let i = 0; i < 1000000; i++) {

}
// console.log(new Date() - t1)
console.timeEnd('a')
