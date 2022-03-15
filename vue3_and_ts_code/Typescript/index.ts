;(() => {
  function sayHello(str: string): string {
    return 'hello ' + str
  }
  let text = 'Typescript'
  console.log(sayHello(text))
})()
console.log(123)
// ##Tag 类型注解: 一种轻量级的为函数或者变量添加的约束
;(() => {
  function showMsg(str: string): string {
    return str
  }
  let msg = '圣诞快乐！'
  console.log(showMsg(msg))
})()

// 类型推断
function show(param: number) {
  return param
}

// 函数类型
let fn1: () => void

// 直接定义的函数
function sum(a: number, b: number): number {
  return a + b
}
// 通过 typeof 关键字火球函数 sum 的类型
// (a: number, b: number) => number
let fn: typeof sum

// 枚举类型
enum Direction {
  UP,
  Down,
  Left,
  Right,
}
let d: Direction = Direction.Down
// 改变枚举类型的值
d = Direction.UP

// 交叉类型
interface Bird {
  fly(): void
}
interface Dog {
  run(): void
}

// 同时具有Bird的fly和Dog的run特征
class Animal {
  fly() {}
  run() {}
}
;(() => {
  //  枚举类型
  enum Color {
    red,
    blue,
    yellow,
  }

  let v: Color = Color.blue
  console.log(v)
})()
;(() => {
  // 接口
  interface Person {
    firstName: string
    lastName: string
  }
  function greeter(person: Person) {
    return `hello, ${person.firstName} ${person.lastName}`
  }
  let user = {
    firstName: 'Yee',
    lastName: 'Yang',
  }
  console.log(greeter(user))

  interface labelObj {
    label: string
  }

  //
  let myobj1: labelObj = {
    label: 'hello world!',
    // size: 10, // 报错
  } // 对象字面量直接赋值 检查所有属性的兼容性

  //
  let myobj = {
    label: 'hello world!',
    size: 10,
  }
  let man: labelObj = myobj // 正确 对象字面量 myobj 中 包含了 labelObj 接口的所有属性

  // 相当于 1. 声明 myobj 的 匿名接口

  let myobj2: {
    label: string
    size: number
  }
  // 2. 对myobj2 进行赋值
  myobj2 = {
    label: 'hello',
    size: 100,
  }

  /**
   * 对象字面量 myobj 被编辑器推导为 匿名接口
   * 匿名接口类型包含了 label 接口 所有的 属性
   * !!!important
   * 对象字面量 在直接赋值的时候，编译器会检查字面量类型是否完全匹配，
   * 多一个少一个属性都会报错
   */

  // function printLabel(labelObj: { label: string }) {
  //   console.log(labelObj.label)
  // }
  // let myObj = {
  //   size: 10,
  //   label: 'hello',
  // }
  // printLabel(myObj)
})()
// 类
;() => {
  interface Iperson {
    firstName: string
    lastName: string
  }
  class Person {
    firstName: string
    lastName: string
    fullName: string
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName
      this.lastName = lastName
      this.fullName = `${this.firstName}${this.lastName}`
    }
  }
  function showFullName(person: Iperson) {
    return `${person.firstName}${person.lastName}`
  }
  const person = new Person('诸葛', '孔明')

  console.log(showFullName(person))
  console.log(person.fullName)

  class Greeter {
    greeter: string
    constructor(message: string) {
      this.greeter = message
    }
    // greeting: string = 'hello'
  }
}
//定义类
class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}

var point = new Point(2, 3)
