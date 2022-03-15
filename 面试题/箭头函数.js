/**
 * 1.箭头函数和普通函数的区别?
 * 2.构造函数可以使用 new 生成实例,箭头函数可以吗?为什么?
 *  箭头函数不是一个 constructor
 *  箭头函数没有 prototype
 * 箭头函数没有自己的 this
 */

// 1.箭头函数和普通函数的区别

/**
 * 箭头函数语法上比普通函数更简便
 * 1.ES6中每一种函数都可以使用形参默认值和剩余运算符
 * 2.箭头函数没有自己的 this 他里面的 this 是继承函数上下文中 的 this ,
 	 使用call或者apply 都无法改变 他的 this 指向
 * 3.箭头函数中没有 arguments (类数组), 只能基于 ...arg 获取传递的参数集合(数组)
 */
// function fn(x){
//   return function (y){
//     return x + y
//   }
// }

// let fnc = x => { y => x + y }
// let fnc1 = x => y => x + y

// let obj = {
//   name: 'foo'
// }
// function fn(){
//   console.log(this)
// }
// fn.call(obj)
// let fn2 = () => {
//   console.log(this)
// }
// fn2.call(obj)

let bar = () => {
  console.log(...arguments)
}
// bar(1, 2) // arguments is not defined
let bar2 = (...arguments) => {
  console.log(arguments)
}
bar2(10, 20, 30) // [10,20,30]
