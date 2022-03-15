/*
	数组的循环
		1. forEach()
*/



/**
 * array.forEach(function (currentValue, index, arr){
	 
 }, thisValue)
 * 	currentValue： 当前元素
 * 	index： 当前元素的索引值
 *  arr：当前元素所属的数组
 * */

let arr = ['aa','bb','cc','aa','aa']


// arr.forEach((value, index,arr) => {
// 	console.log(this+'===='+index+":"+value,arr)
//  //  由于是箭头函数形式 this指向是 当前作用域  window
// },111)
// arr.forEach(function(val,index,arr){
//     console.log(this,val,index,arr);
// },111);

// Map()

// let result = arr.map((val, index,arr)=>{
// 	console.log(val, index, arr)
// })
// console.log(result)



// some

// let aNews = ['aaa','bbb','ccc'];
// let result = aNews.some((item,index,arr) => {
//     return item=='aaa';
// });
// console.log(result);  // true


// every

// let arr = [1,3,5,7,9];
// let newArr = arr.every((val,index,arr)=>{
//     return val%2==1;  // 判断是不是奇数
// });
// console.log(newArr);  // true

var newArr = arr.reduce(function (prev, cur) {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
},[]);
console.log(newArr)
console.log(arr.indexOf('aa'))