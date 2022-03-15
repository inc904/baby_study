// 定义一家猎人公会
// 主要功能包括任务发布大厅（topics）以及订阅任务（subscribe）发布任务（publish）
let HunterUnion = {
  type: 'hunt',
  topics: Object.create(null),
  subscribe: function(topic, fn) {
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }
    this.topics[topic].push(fn)
  },
  publish: function(topic, money) {
    if (!this.topics[topic]) return
    for (let fn of this.topics[topic]) {
      fn(money)
    }
  }
}
// 定义一个猎人类
function Hunter(name, level) {
  this.name = name
  this.level = level
}
// 猎人可以在猎人公会 发布订阅任务
Hunter.prototype.subscribe = function(topic, fn) {
  console.log(`${this.level} 猎人 ${this.name} 订阅了狩猎 ${topic} 的任务`)
  HunterUnion.subscribe(topic, fn)
}
Hunter.prototype.publish = function(topic, money) {
  console.log(`${this.level} 猎人 ${this.name} 发布了狩猎 ${topic} 的任务`)
  HunterUnion.publish(topic, money)
}

// 猎人公会来了几位猎人
let hunterMing = new Hunter('小明', '黄金')
let hunterJIn = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')

// 小明、小金、小张 分别订阅了狩猎 target 的任务
hunterMing.subscribe('tiger', function(money) {
  console.log('小明表示：' + money > 200 ? '接了任务' : '不接任务')
})
hunterJIn.subscribe('tiger', function(money) {
  console.log('小金表示：接了任务')
})
hunterZhang.subscribe('tiger', function(money) {
  console.log('小张表示：接了任务')
})
hunterPeter.subscribe('sheep', function(money) {
  console.log('Peter表示：接了任务')
})

// Peter 发布了狩猎 tiger 的任务

hunterPeter.publish('tiger', 198)

// 猎人们发布（发布者）或者订阅（订阅者/观察者）任务都是通过猎人公会（调度中心）关联起来的 他们没有直接的交流