

function Person() {
  this.gender = 'male'
  this.say1 = function () {
    console.log('实例方法')
    console.log(this.age)
    console.log(this)
  
  }
}

Person.say2 = function () {
  console.log('静态方法')
}
Person.prototype.run = function () {
  console.log('run')
}
Person.prototype.nickname = 'zzc'
Person.age = 18
var p = new Person()

// nickname 实例属性  实例对象 才能访问 Person 不能访问
// age 静态属性 Person 能访问
// gender 实例属性
console.log(p.nickname, p.age, p.gender)
console.log(Person.nickname, Person.age, Person.gender)
/*

  say1 实例方法
  run 实例方法

  say2 静态方法
*/
// Person.run() // run 实例方法 Person 无法调用 Person.prototype.run() 才能调用
// Person.say1('P') //  实例方法 Person 无法调用
Person.say2('P')
p.say1('p')
// // p.say2('p')
// p.run()