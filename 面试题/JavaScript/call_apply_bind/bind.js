Function.prototype.myBind = function(thisArg) {
  if (typeof this !== 'function') {
    return;
  }
  var _self = this;
  console.log('myBInd:', _self, thisArg)
  var args = Array.prototype.slice.call(arguments, 1)
  var fnBound = function() {
    console.log('fnBound:', this, thisArg, _self)
    // 检测 New
    // 如果当前函数的this指向的是构造函数中的this 则判定为new 操作
    var _this = this instanceof _self ? this : thisArg;
    console.log('_this:', _this)
    return _self.apply(_this, args.concat(Array.prototype.slice.call(arguments)));
  }
  // 为了完成 new操作
  // 还需要做一件事情 执行原型 链接 （思考题，为什么？
  fnBound.prototype = this.prototype;
  return fnBound;
}