/**
 * js 向外暴露成员
 */

// 1. 直接导出 ok

// export default {
// 	person: {
// 		name: 'qiaodao',
// 		habby: 'hahhah'
// 	}
// }

// 2. 用变量接收 ok

var person = {
	name: 'yunxun',
	gender: 'male'
}
export default person

// 3. export 

export var title = '断桥残雪'