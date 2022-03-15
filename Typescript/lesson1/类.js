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
var Person = /** @class */ (function () {
    // constructor(name: string) {
    //   this.name = name
    // }
    function Person() {
    }
    Person.prototype.run = function () {
        console.log(this.name + '在运动');
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    return Person;
}());
// let p = new Person('zs')
var p = new Person();
// p.run()
p.getName();
p.setName('ls');
console.log(p.name);
// 实现继承 extends super
var Studrnt = /** @class */ (function (_super) {
    __extends(Studrnt, _super);
    function Studrnt() {
        return _super.call(this) || this;
    }
    return Studrnt;
}(Person));
var s = new Studrnt();
s.setName('大黄');
console.log(s.name);



@action
  async updateAddressItem(params) {
    runInAction(() => {
      this.userAddressItem = Object.assign({}, this.userAddressItem, params)
    })
  }
  @action
  async getEvalutionList(params) {
    const data = await userService.fetchEvaluate(params)
    console.log('dataEval', data)
    console.log(params)
    runInAction(() => {
      this.evalutionList = data
    })
  }
  @action
  async getWaitEvalutionList(params) {
    const data = await userService.fetchEvaluate(params)
    console.log('dataEval', data)
    console.log(params)
    runInAction(() => {
      this.waitEvalutionList = data
    })
  }