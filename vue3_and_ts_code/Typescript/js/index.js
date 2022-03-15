;
(function () {
    function sayHello(str) {
        return 'hello ' + str;
    }
    var text = 'Typescript';
    console.log(sayHello(text));
})();
console.log(123);
(function () {
    function showMsg(str) {
        return str;
    }
    var msg = '圣诞快乐！';
    console.log(showMsg(msg));
})();
// 类型推断
function show(param) {
    return param;
}
// 函数类型
var fn1;
// 直接定义的函数
function sum(a, b) {
    return a + b;
}
// 通过 typeof 关键字火球函数 sum 的类型
// (a: number, b: number) => number
var fn;
// 枚举类型
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
var d = Direction.Down;
// 改变枚举类型的值
d = Direction.UP;
// 同时具有Bird的fly和Dog的run特征
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.fly = function () { };
    Animal.prototype.run = function () { };
    return Animal;
}());
// 接口
;
(function () {
    function greeter(person) {
        return "hello, " + person.firstName + " " + person.lastName;
    }
    var user = {
        firstName: 'Yee',
        lastName: 'Yang',
    };
    console.log(greeter(user));
})();
(function () {
    var Person = /** @class */ (function () {
        function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = "" + this.firstName + this.lastName;
        }
        return Person;
    }());
    function showFullName(person) {
        return "" + person.firstName + person.lastName;
    }
    var person = new Person('诸葛', '孔明');
    console.log(showFullName(person));
    console.log(person.fullName);
})();
