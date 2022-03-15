var F = function () {
}
Object.prototype.a = function () {
  console.log('a')
}

Function.prototype.b = function () {
  console.log('b')
}

var f = new F()

f.a()
// f.b()
/**
 1. f.a() --> 实例f调用a方法，自身没有，从其原型中查找：f.__proto__ == F.prototype
 2. F.prototype中没有a方法，于是继续在其原型中查找，F.prototype. __proto__ == Object.prototype
 3. Obejct.prototype中有a方法，无b方法，所以f.a()结果为a，f.b()调用会报错：f.b is not a function
 */
F.a()
F.b()
/**
 4. F.a(): 构造函数调用a方法。自身没有，从其原型中查找: F.__proto__ == Function.prototype
 5. Function.prototype中有b方法，所以F.b()的输出为b。没有a方法，继续在其原型中查找，Function.prototype.__proto__ == Object.prototype
 6. Object.prototype中有a方法，所以F.a()的输出为a
 */





