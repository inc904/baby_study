var xhr = new XMLHttpRequest()
function myAjax(url, callback){
  xhr.onload = function () {
    callback(this.responseText)
  }
  xhr.open('GET', url, true)
  xhr.send()
}