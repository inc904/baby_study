// 观察者模式
/*
		有一家猎人公会 其中每个猎人都具有发布任务（publish）订阅任务（subscribe）的功能
		他们都有一个订阅列表来记录睡订阅了自己

*/ 
// 定义一个类
// 包括姓名、级别、订阅列表
function Hunter(name,level){
	this.name = name
	this.level = level
	this.list = []
}

Hunter.prototype.publish = function (money){
	console.log(`${this.level} 猎人 ${this.name} 寻求帮助`)
	this.list.forEach((item,index)=>{
		item(money)
	})
}
Hunter.prototype.subscribe = function (target, fn){
	console.log(`${this.level} 猎人 ${this.name}  订阅了 ${target.name}`)
	target.list.push(fn)
}
// 猎人公会来了几个猎人
let hunterMing = new Hunter('小明', '黄金')
let hunterJin = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')

// peter 等级较低，可能需要帮助 所以小明小金小张都订阅了 peter
hunterMing.subscribe(hunterPeter, function(money){
	console.log('小明表示：'+ money >200 ? '可以给予帮助': '暂时很忙，不能给予帮助')
})
hunterJin.subscribe(hunterPeter, ()=>{
	console.log('小金表示：给予帮助')
})
hunterZhang.subscribe(hunterPeter, function(){
	console.log('小张表示：给予帮助')
})

//  peter 遇到困难 赏金 198 寻求帮助

hunterPeter.publish(198)

// 猎人们（观察者）关联他们感兴趣的猎人（目标对象）如peter 当peter有困难，会自动通知给他们（观察者）
console.log(hunterPeter)




