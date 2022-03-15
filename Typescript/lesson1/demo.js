var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// string 类型
var Aname = 'sz';
// number 类型
var age = 12;
// 数组
{
    // 普通,ts 可以根据 值得类型推断出 为 数字数组
    var arr = [1, 2, 3];
    // 数组: 数字数组
    var arr1 = [1, 2, 3];
    // 字符串数组
    var arr2 = ['a', 's', 'c'];
    // 数字和字符串混合数组
    var arr3 = [1, 2, 'a', 's'];
    // 任意类型得 数组
    var arr4 = [1, 2, '1', true, {}, []];
}
// 对象 以及可选参数
{
    var obj = {
        name: 'ax',
        age: 19,
        fav: 'asd'
    };
}
// 推断和注解
{
    var aaa = 'sss'; // 注解:变量 aaa 为 number 类型
    aaa = 'ssaa';
    var a1 = 12;
    var a2 = 23;
    var a3 = 'asd';
    var a4 = a1 + a2; // 推断 a4 类型为 number
    var a5 = a1 + a3; // 推断 a5 类型为 string
    console.log(a5);
}
// 任意类型
{
}
// 单个参数 注解
{
    function fn(n1, n2) {
        return n1 + n2;
    }
    var count = fn(1, 2);
    console.log(count);
}
// 对象参数, 类型别名
{
    // 错误
    // function paramsIsObj({ n1: number, n2: number }) {
    //   return n1 + n2
    // }
    function paramsIsObj(_a) {
        var n1 = _a.n1, n2 = _a.n2;
        return n1 + n2;
    }
    paramsIsObj({ n1: 12, n2: 'asd' });
}
// 自定义 type
{
    function paramsIsObj2(_a) {
        var n1 = _a.n1, n2 = _a.n2;
        return n1 + n2;
    }
    paramsIsObj({ n1: 3, n2: 'as' });
}
// 接口
{
}
{
    function paramsIsObj3(_a) {
        var n1 = _a.n1, n2 = _a.n2;
        return n1 + n2;
    }
    var res = paramsIsObj({ n1: 3, n2: 'as' });
    console.log(res);
}
// 类
{
    var Woman = /** @class */ (function () {
        function Woman(sex, name, age) {
            this.sex = sex;
            this.name = name;
            this.age = age;
        }
        Woman.prototype.sayHello = function () {
            console.log('hello');
        };
        Woman.prototype.sayLove = function () {
            console.log('i love you');
        };
        return Woman;
    }());
    // let girl: Woman = new Woman('famale', 'rose', 13)
    // console.log(girl.sex)
    // console.log(girl.name)
    // console.log(girl.age)
    var Girl = /** @class */ (function (_super) {
        __extends(Girl, _super);
        function Girl(sex, name) {
            var _this = _super.call(this, sex, name, age) || this;
            _this.sex = sex;
            _this.name = name;
            return _this;
        }
        return Girl;
    }(Woman));
}
// 大地课程
//类
//es5 中的类
{
    function Person1() {
        this.name = 'joye';
        this.age = 19;
    }
    var p = new Person1();
    console.log(p.name);
}
// 构造函数和原型链里增加方法
{
    function Person() {
        this.name = 'joye';
        this.age = 19;
        this.run = function () {
            // 实例方法
            console.log(this.name + ' is runing...');
            console.log('this', this);
        };
    }
    Person.getInfo = function () {
        // 静态方法
        console.log('静态方法中的info');
    };
    // 原型链上的属性会被多个实例共享 构造函数上的属性不会
    Person.prototype.sex = '男';
    Person.prototype.work = function () {
        console.log(this.name + ' is working...');
    };
    // 调用静态方法
    Person.getInfo();
    var p1 = new Person();
    var p2 = new Person();
    p1.run();
    p1.work();
    p2.run();
    p2.work();
    // joyeis runing...
    // joyeis working...
    // joyeis runing...
    // joyeis working...
    console.log(p1.age);
    console.log(p2.age);
    console.log(p1.sex);
    console.log(p2.sex);
}
// es5 中的继承
{
    // web类 继承 Person 类
    // 对象冒充的继承方式
    function Web() {
        Person.call(this); // 对象冒充实现继承
    }
    var w = new Web();
    w.run(); // 对象冒充 可以继承构造函数中的属性和方法
    // w.work()  // 对象冒充 无法继承原型链的属性和方法
    // 原型链 实现继承
    // 既可以继承构造函数里面的属性和方法，也可以继承原型链上的属性和方法
    // 但是 实例化的时候 无法给父类 传参
    function cWeb() { }
    cWeb.prototype = new Person();
    var c = new cWeb();
    c.run();
    c.work();
    // 原型链加构造函数的组合继承模式
    function yPerson() {
        Person.call(this, name, age);
    }
    yPerson.prototype = new Person();
    // 另一中写法
    function yPerson2() {
        Person.call(this, name, age);
    }
    yPerson.prototype = Person.prototype;
}
