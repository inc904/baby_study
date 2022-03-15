// function myPd(num) {
//   return num.toString().padStart(2, '0')
// }
// class Clock {
//   timer = null
//   constructor(temp) {
//     // this.temp = temp
//   }
//   render() {
//     let date = new Date()
//     let hours = date.getHours()
//     let mins = date.getMinutes()
//     let secs = date.getSeconds()
//     console.log(secs)

//     if (hours < 10) hours = myPd(hours)
//     if (mins < 10) mins = myPd(mins)
//     if (secs < 10) secs = myPd(secs)
//     console.log(`${hours}:${mins}:${secs}`)
//   }
//   stop() {
//     clearInterval(this.timer)
//   }
//   start() {
//     this.render()
//     this.timer = setInterval(this.render, 1000)
//   }
// }

// let clock = new Clock()
// clock.start()
