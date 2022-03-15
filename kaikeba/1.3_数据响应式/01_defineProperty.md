## Object.defineProperty()
### 定义：
方法会直接在一个对象上定义一个新的属性，或者修改一个对象的现有属性，并返回此对象。
## 用法
`Object.defineProperty(obj, prop, descriptor)`
- obj:
  要定义属性的对象
- prop
  要定义或者修改属性的名称或`Symbol`
- descriptor
  要定义或修改的属性描述符
- 返回值
  被传递给函数的对象
### example
```js
const object1 = {}
Object.defineProperty('object1', 'property1', {
  value: 42,
  writable: false
})
object1.property1 = 77
// throw an error in strict mode
console.log(object1.property1)
// expected potput:42
```
### 对象的定义与赋值  
经常使用的定义和赋值方法`object.prop = value`或`obj['prop'] = value`
```js
let Person = {}
Person.name = 'Jack'
Person['gender'] = 'famale'
console.log(Person.name) // Jack
console.log(Person.gender) // famale
```
一般通过为对象的属性赋值的情况下，对象的属性可以修改也可以删除，但是通过`Object.defineProperty()`定义的属性，通过描述符的设置可以进行更精准的控制对象的属性。
### 属性得特性以及内部属性
JavaScript 有三种类型的属性
1. 命名数据属性：拥有一个确定的值的属性。这也是最常见的属性。
2. 命名访问器属性：通过`getter`和`setter`进行读取和赋值的属性。
3. 内部属性：由JavaScript引擎内部使用的属性，不能通过JavaScript代码直接访问到，不过可以通过一些方法间接的读取和设置。比如，每个对象都有一个内部属性`[[prototype]]`,你不能直接访问这和属性，但是可以通过`Object.getPrototypeOf()`方法间接的读取到它的值。虽然内部属性通常用一个双率括号包围的名称来表示，但实际上这并不是他的名字，他们是一种抽象操作，是不可见的，根本没有上面两种属性有的那种字符串类型的属性。
### 属性描述符



> https://www.jianshu.com/p/8fe1382ba135
