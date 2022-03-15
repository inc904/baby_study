function Demo() {
}

let d = new Demo()

console.log('d.constructor:', d.constructor) // ƒ Demo() {}
console.log('d.__proto__:', d.__proto__)
/**
 __proto__= {
    constructor: ƒunction Demo(){},
    __proto__: Object
    }
 */
console.log(Demo.prototype)
/**
 
 Demo.prototype = {
    constructor: ƒunction Demo(){},
    __proto__: Object
    }
 
 */

// { constructor: ƒ Demo();__proto__: Object}
// { constructor: ƒ Demo(),__proto__: Object}

// 对象的 __proto__ 属性 和  构造函数的 原型对象 prototype 指向相同
console.log('出现了链式结构')

console.log(
  'd.__proto__ === Demo.prototype:',
  d.__proto__ === Demo.prototype
)
console.log(
  'Demo.__proto__ === Function.prototype:',
  Demo.__proto__ === Function.prototype
)
console.log(
  'Function.prototype.__proto__ === Object.prototype:',
  Function.prototype.__proto__ === Object.prototype
)
console.dir(Function.__proto__)
console.dir(Function.prototype.__proto__)

// console.dir(Demo.prototype.__proto__)
// console.dir(Demo.prototype.__proto__)
console.dir(Demo.__proto__.constructor)
console.dir(Demo.prototype)

