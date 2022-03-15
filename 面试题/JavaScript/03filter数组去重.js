var arr = [2, 3, 4, 4, 5, 2, 3, 6]
var arr2 = arr.filter(function (element, index, self) {
  console.log(element, self.indexOf(element), index)
  return self.indexOf(element) === index
})
console.log(arr2)