function Father() {}
function Son() {}
let me = new Son()

/**
 每一个函数 都有属性 且都有一个 属性叫原型（prototype）
 原型（prototype） 是一个对象，有 constructor 属性和 __proto__ 属性
 对象__proto__属性的值就是它所对应的原型对象
 */
console.log(Son.prototype)
console.log(me.constructor.prototype)
console.log(me.prototype)
console.log(me.__proto__)