interface Shape {
  color: string
}
interface PenStrock {
  penWidth: number
}
interface Squre extends Shape, PenStrock {
  sideLigth: number
}
// let squre1: Squre = {} // 缺少类型
let squre = {} as Squre // 类型断言
squre.color = 'cyan'
squre.sideLigth = 10
squre.penWidth = 6
