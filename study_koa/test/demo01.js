async function testAsync() {
  return 'hello Async！'
}

const result = testAsync()
console.log('result:', result)
// const res = await testAsync()
// console.log('res:', res)

function takeLongTime(resolve, reject) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('long_time_value'), 3000)
  })
}
async function testAwait() {
  const res = await takeLongTime((val) => {
    console.log(val)
  })
  // return res
  console.log('testAwait:', res)
}
// console.log('await:', testAwait())
testAwait()

// async function test() {
//   const res = await takeLongTime()
//   console.log(res)
// }

// test()
