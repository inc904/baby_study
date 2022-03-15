var name = 'CommentJS';
function add(x, y){
  return x + y
}
var arr = [1,2,3,4,5]
var obj = {
  fe: 'jj',
  re: 'deco'
}
// 将需要导出的成员挂载到 exports 对象上，
// 使用对象上的某个成员，需要 `.对象成员` 来访问
exports.add = add
exports.ex = {
  add: add,
  arr: arr,
  obj: obj
}

//  ;{
//   add: '[Function: add]',
//   ex: {
//     add: '[Function: add]',
//     arr: [1, 2, 3, 4, 5],
//     obj: { fe: 'jj', re: 'deco' }
//   }
// }