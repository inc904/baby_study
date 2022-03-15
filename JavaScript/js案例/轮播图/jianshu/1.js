window.onload = function () {
  var imgList = document.getElementsByTagName("img")
  var ul = document.getElementById("ul");
  var box = document.getElementById("box");
  var prev = document.getElementsByClassName('prev')[0]
  var next = document.getElementsByClassName('next')[0]
  var index = 0
  var dots = document.getElementsByTagName('li')
  var timer = null
  console.log(dots)
  ~(function init() {
    // 动态添加指示器
    addDots()
    // 指示器切换
    dotsActive()
    // 自动轮播
    auto()
  })()

  // 人为干预
  box.onmouseenter = function () {
    pausePic()
    console.log('鼠标进入自动终止，当前index：' + index)
  }
  box.onmouseleave = function () {
    console.log('鼠标离开自动开启，当前index：' + index)
    auto()
  }
  // 移动函数
  function go(index) {
    box.style.left = -500 * index + 'px'
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList = ''
      dots[index].classList = 'active'
    }
    console.log('正在轮播，当前index：' + index)
  }
  // go(0)
  // 下一张切换
  next.onclick = function () {
    nextPic()
    console.log('点击了下一张按钮，当前index：' + index)
  }
  // 上一张切换
  prev.onclick = function () {
    prevPic()
    console.log('点击了上一张按钮，当前index：' + index)
  }
  // 自动切换
  function auto(index) {
    timer = setInterval(function () {
      nextPic()
    }, 2000)
  }
  // 暂停自动
  function pausePic() {
    clearInterval(timer)
    timer = null
  }
  // 下一张切换
  function nextPic() {
    index++
    index >= imgList.length ? index = 0 : index = index
    go(index)
  }
  // 上一张切换
  function prevPic() {
    index--
    index < 0 ? index = imgList.length - 1 : index = index
    go(index)
  }
  // 添加底部圆点
  function addDots() {
    for (var i = 0; i < imgList.length; i++) {
      var li = document.createElement("li")
      li.setAttribute('num', i)
      ul.appendChild(li);
    }
  }

  // 按钮点击切换
  function dotsActive() {
    for (let i = 0; i < dots.length; i++) {
      dots[i].onclick = function () {
        index = i
        go(index)
      }
    }
  }
}
