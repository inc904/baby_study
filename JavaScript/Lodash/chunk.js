// chunk 切分数组

/*
_.chunk(array, [size=1])
将数组拆分成多个 size 长度的区块
如果无法等长，那剩余的元素组成最后一个区块。
*/
const arr = [1, 2, 3, 4, 5, 6]
console.log(_.chunk(arr, 2))