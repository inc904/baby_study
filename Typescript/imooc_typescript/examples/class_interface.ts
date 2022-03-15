// interface ClockInterface {
//   curretnTime: Date
// }

// class Clock implements ClockInterface {
//   curretnTime: Date
//   constructor(h: number, m: number) {}

//   setTime(d: Date) {
//     this.curretnTime = d
//   }
// }

interface ClockInterface {
  tick()
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}
function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick toc')
  }
}
let digital = createClock(DigitalClock, 12, 12)
let analog = createClock(AnalogClock, 12, 12)
