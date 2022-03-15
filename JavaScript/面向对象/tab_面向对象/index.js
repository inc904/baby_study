var that
class TabBar {
  constructor(id) {
    that = this
    this.main = document.querySelector(id)
    this.ulBox = document.querySelector('.itemBox')

    this.addBtn = this.main.querySelector('.add')
    this.init()
    console.log(this.addBtn)
  }
  init() {
    this.updatedNode()
    // 初始化操作
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.sections[i].index = i
      this.lis[i].onclick = this.toggleItem
      this.closes[i].onclick = this.deleteItem
      this.spans[i].ondblclick = this.editItem
    }
    this.addBtn.onclick = this.addItem
    console.log(typeof this.lis)
    console.log(this.lis)
    console.log(this.lis[1])
  }
  toggleItem() {
    // console.log(this.index)
    that.clearClass()
    this.classList.add('liactive')
    that.sections[this.index].classList.add('conactive')
  }
  deleteItem(e) {
    e.stopPropagation()
    var liIndex = this.parentNode.index
    that.lis[liIndex].remove()
    that.init()
    if (document.querySelector('.liactive')) return
    liIndex--
    that.lis[liIndex] && that.lis[liIndex].click()
  }
  addItem() {
    that.clearClass()
    var li = `<li class="liactive">
    <span class="title">new title</span>
    <span class="close">x</span>
  </li>`
    var sectionItem = ` <section class="conactive">new section</section>`
    that.ulBox.insertAdjacentHTML('beforeend', li)
    that.main
      .querySelector('.content')
      .insertAdjacentHTML('beforeend', sectionItem)
    that.init()
  }
  editItem() {
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.selection.empty()
    var spanNode = this
    var olderVal = this.innerHTML
    this.innerHTML = '<input type="text" style="width: 70%; height: 70%;"/>'
    var input = this.children[0]
    input.value = olderVal
    input.select()
    input.onblur = function() {
      spanNode.innerHTML = this.value
    }
    input.onkeyup = function(e) {
      if (e.keyCode === 13) {
        input.blur()
      }
    }
  }
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].classList.remove('liactive')
      this.sections[i].classList.remove('conactive')
    }
  }
  updatedNode() {
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section')
    this.closes = this.main.querySelectorAll('.close')
    this.spans = this.main.querySelectorAll('.itemBox li span:first-child')
  }
}

window.onload = function() {
  new TabBar('#tab')
}
