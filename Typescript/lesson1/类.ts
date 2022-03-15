class Person {
    name: string
    // constructor(name: string) {
    //   this.name = name
    // }
    constructor() {
    }

    run(): void {
        console.log(this.name + '在运动')
    }

    getName(): string {
        return this.name
    }

    setName(name: string): void {
        this.name = name
    }
}

// let p = new Person('zs')
let p = new Person()
// p.run()
p.getName()
p.setName('ls')
console.log(p.name)

// 实现继承 extends super
class Studrnt extends Person {
    constructor() {
        super()
    }
}

let s = new Studrnt()
s.setName('大黄')
console.log(s.name)

// 多态：父类定义的属性或者方法，自己不去实现，而是让继承他的子类去实现，不同的子类有不同的表现。
//  属于继承的一种变现。
class Animal {
    name: string

    constructor(name: string) {
        this.name = name
    }

    eat() {
        console.log('eat')
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name)
    }

    eat() {
        console.log(this.name + '吃肉')
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name)
    }

    eat() {
        console.log(this.name + '吃猫粮')
    }
}

// 抽象方法
// typescript 中的抽象类，他是提供其他类的继承的基类，不能直接被实例化
// 用 abstract 关键字定义的抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

// abstract 抽线发放只能定义在抽象类里面

// 抽象类和抽象方法 是用来定义标准的 ， Bird 类的子类必须包含 sing 方法
// 抽象类里面可以包含非抽象方法，但是必须包含至少一个抽象方法
abstract class Bird {
    sing(): void {
    }

    abstract eat(): any
}

// var a = new Bird()
class BaiLLing extends Bird {
    constructor() {
        super()
    }

    eat() {
        console.log('sing')
    }
}
