// string 类型
let Aname: string = 'sz'
// number 类型
let age: number = 12
// 数组
{
  // 普通,ts 可以根据 值得类型推断出 为 数字数组
  let arr = [1, 2, 3]
  // 数组: 数字数组
  let arr1: number[] = [1, 2, 3]
  // 字符串数组
  let arr2: string[] = ['a', 's', 'c']
  // 数字和字符串混合数组
  let arr3: (number | string)[] = [1, 2, 'a', 's']
  // 任意类型得 数组
  let arr4: any[] = [1, 2, '1', true, {}, []]
}
// 对象 以及可选参数
{
  const obj: {
    name: string
    age: number
    fav: string
  } = {
    name: 'ax',
    age: 19,
    fav: 'asd'
  }
}

// 推断和注解
{
  let aaa: string = 'sss' // 注解:变量 aaa 为 number 类型
  aaa = 'ssaa'
  let a1 = 12
  let a2 = 23
  let a3 = 'asd'
  let a4 = a1 + a2 // 推断 a4 类型为 number
  let a5 = a1 + a3 // 推断 a5 类型为 string
  console.log(a5)
}

// 任意类型
{
}
// 单个参数 注解
{
  function fn(n1: number, n2: number): number {
    return n1 + n2
  }

  let count = fn(1, 2)
  console.log(count)
}

// 对象参数, 类型别名
{
  // 错误
  // function paramsIsObj({ n1: number, n2: number }) {
  //   return n1 + n2
  // }
  function paramsIsObj({ n1, n2 }: { n1: number; n2: string }): string {
    return n1 + n2
  }

  paramsIsObj({ n1: 12, n2: 'asd' })
}

// 自定义 type
{
  type tobj = {
    n1: number
    n2: string
  }

  function paramsIsObj2({ n1, n2 }: tobj): string {
    return n1 + n2
  }

  paramsIsObj({ n1: 3, n2: 'as' })
}

// 接口
{
  interface MyData {
    n1: number
    n2: string
  }
}
{
  interface Tobj {
    n1: number
    n2: string
  }

  function paramsIsObj3({ n1, n2 }: Tobj): string {
    return n1 + n2
  }

  let res = paramsIsObj({ n1: 3, n2: 'as' })
  console.log(res)
}
// 类
{
  class Woman {
    public sex: string
    protected name: string
    private age: number

    public constructor(sex: string, name: string, age: number) {
      this.sex = sex
      this.name = name
      this.age = age
    }

    public sayHello() {
      console.log('hello')
    }

    protected sayLove() {
      console.log('i love you')
    }
  }

  // let girl: Woman = new Woman('famale', 'rose', 13)
  // console.log(girl.sex)
  // console.log(girl.name)
  // console.log(girl.age)

  class Girl extends Woman {
    public constructor(sex: string, name: string) {
      super(sex, name, age)
      this.sex = sex
      this.name = name
    }
  }
}

// 大地课程

//类
//es5 中的类

{
  function Person1() {
    this.name = 'joye'
    this.age = 19
  }

  let p = new Person1()
  console.log(p.name)
}

// 构造函数和原型链里增加方法
{
  function Person3() {
    this.name = 'joye'
    this.age = 19
    this.run = function() {
      // 实例方法
      console.log(this.name + ' is runing...')
      console.log('this', this)
    }
  }

  Person3.getInfo = function() {
    // 静态方法
    console.log('静态方法中的info')
  }
  // 原型链上的属性会被多个实例共享 构造函数上的属性不会
  Person3.prototype.sex = '男'
  Person3.prototype.work = function() {
    console.log(this.name + ' is working...')
  }
  // 调用静态方法
  Person3.getInfo()
  let p1 = new Person3()
  let p2 = new Person3()

  p1.run() // joyeis runing...
  p1.work() // joyeis working...
  p2.run() // joyeis runing...
  p2.work() // joyeis working...

  console.log(p1.age)
  console.log(p2.age)

  console.log(p1.sex)
  console.log(p2.sex)
}
// es5 中的继承
{
  // web类 继承 Person 类
  // 对象冒充的继承方式
  function Web() {
    Person3.call(this) // 对象冒充实现继承
  }

  let w = new Web()
  w.run() // 对象冒充 可以继承构造函数中的属性和方法
  // w.work()  // 对象冒充 无法继承原型链的属性和方法

  // 原型链 实现继承

  // 既可以继承构造函数里面的属性和方法，也可以继承原型链上的属性和方法
  // 但是 实例化的时候 无法给父类 传参
  function cWeb() {}

  cWeb.prototype = new Person3()
  let c = new cWeb()
  c.run()
  c.work()

  // 原型链加构造函数的组合继承模式
  function yPerson() {
    Person3.call(this, name, age)
  }

  yPerson.prototype = new Person3()

  // 另一种写法
  function yPerson2() {
    Person3.call(this, name, age)
  }

  yPerson.prototype = Person3.prototype
}
