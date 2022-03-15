
class Person {
	constructor (name, age) {
		this.name = name
		this.age = age 
	}
	sayHello () {
		console.log('大家好！')
	}
}

class American {
	constructor (name, age){
		this.name = name 
		this.age = age
	}
	sayHello () {
		console.log('say hello!')
	}
}

// extends 关键字实现继承
class Japanese extends Person {}

class Chinese extends Person{
	constructor (name, age, IDNumber) {
		// super 关键字
		// 子类通过 extends 继承了 父类，在子类的 constructor 内部·优先·调用 super()
		super(name, age)
		this.IDNumber = IDNumber
	}
}

const a1 = new American('Jack',10)
console.log(a1)
a1.sayHello()

const j1 = new Japanese('桃太郎', 12)
console.log(j1)

const c1 = new Chinese('张三', 20, 1234)
console.log(c1)
c1.sayHello()
