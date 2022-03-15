// 5. typescript 中的接口
//  5.1 属性类接口
//  5.2 函数类型的接口
//  5.3 可索引接口
//  5.4 类类型接口
//  5.5 接口扩展

// 接口的作用： 在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范但。
// 在程序设计里卖弄，接口起到一种限制和规范的作用。
// 接口定义了某一批类所需要的遵守的规范，接口不关心这些类的内部数据，也不关心这些类的的方法的实现细节，它只规定这批类必须提供某些方法，提供这些方法的类就可以满足实际需求， ts 中的 接口类似于 java ，同时还增加了更灵活的接口类型，包括属性、函数、可索引值和类等。

// 1. 属性接口  对 json 的约束

function printLabel(label: string): void {
  console.log('printLabel')
}

printLabel('hello')

function printL(labelInfo: { label: string }) {
  console.log(labelInfo)
}

interface FullName {
  firstName: string
  secondName: string
}

function printName(name: FullName) {
  console.log(name.firstName)
}
var obj = {
  age: 20,
  firstName: 'z',
  secondName: 'zc'
}
printName(obj) // 传入的参数必须含有
// printName({ // 错误，传入的参数必须只有
//   age: 20,
//   firstName: 'z',
//   secondName: 'zc'
// })
