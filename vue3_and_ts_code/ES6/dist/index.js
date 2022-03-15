'use strict';

var a = 70;
var b = 'hello';
{
  var c = 'world';
}
window.onload = function () {
  console.log(a);
  console.log(b);
  console.log(c);
};
