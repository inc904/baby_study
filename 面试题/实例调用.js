/**
 * (5).add(3).minus(2)  == 6
 * arr.push()
 * arr是 Array 的实例, 可以调用 Array.prototype 上的方法, push 就是其中一个
 */

!(function() {
  function check(n) {
    n = Number(n)
    return isNaN(n) ? 0 : n
  }
  console.log('outer:', this)
  function add(n) {
    n = check(n)
    console.log('inner:', this)
    return this + n
  }
  function minus(n) {
    n = check(n)
    return this - n
  }
  // ['add', 'minus'].forEach(item => {
  //   Number.prototype[item] = eval(item)
  // })
  Number.prototype.add = add
  Number.prototype.minus = minus
})()
console.log((5).add(3).minus(2))
// console.log((5).add('aa').minus(2))
