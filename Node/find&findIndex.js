var users = [
  {id: 1, name: 'Tom'},
  {id: 2, name: 'Tom'},
  {id: 3, name: 'Tom'},
  {id: 4, name: 'Tom'},
]
Array.prototype.myFind = function (conditionFunc) {
  for (let i = 0; i < this.length; i++) {
    if(conditionFunc(this[i], i)){
      return this[i]
    }
  }
}
users.myFind(function(item, index){
  return item.id === 4
})