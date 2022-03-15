var main = require('./main')
console.log(main)
console.log(main.ex.arr)
console.log(main.ex.obj.fe)
console.log(main.ex.add(3, 4))
// {
//   // add: '[Function: add]',
//   ex: {
//     add: '[Function: add]',
//     arr: [1, 2, 3, 4, 5],
//     obj: { fe: 'jj', re: 'deco' }
//   }
// }
[1,2,3].push(99)