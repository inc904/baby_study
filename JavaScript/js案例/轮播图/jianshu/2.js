// 未完成
var lunbo = function () {
  this.index = 0
   this.imgList = document.getElementsByTagName("img")
   this.ul = document.getElementById("ul");
   this.box = document.getElementById("box");
   this.prev = document.getElementsByClassName('prev')[0]
   this.next = document.getElementsByClassName('next')[0]
   this.index = 0
   this.dots = document.getElementsByTagName('li')
   this.timer = null
}
lunbo.prototype.go = function () {
  this.box.style.left = -500 * index + 'px'
  dots = this.dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList = ''
    dots[index].classList = 'active'
  }
}
lunbo.prototype.next = function () {
  index++
  index >= imgList.length ? index = 0 : index = index
  this.go(index)
  console.log(index)
}
lunbo.prototype.prev = function () {

}
lunbo.dotClick = function () {
  for (let i = 0; i < dots.length; i++) {
    dots[i].onclick = function () {
      index = i
      go(index)
    }
  }
}