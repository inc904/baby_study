function myPadStart(num) {
  return num.toString().padStart(2, '0')
}
var formatDate = function (date) {
  var t = new Date(date)
  var Y = t.getFullYear()
  var M = t.getMonth() + 1
  var D = t.getDate()
  var hh = t.getHours()
  var mm = (t.getMinutes()).toString().padStart(2, '0')
  var ss = myPadStart(t.getSeconds())
  return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
}
export default {
  formatDate
}