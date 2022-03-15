/**
 *
 * 封装 ajax 方法
 * @param {*} url get 请求对象
 * @param {*} callback callback 处理函数
 * @returns promise 对象 以支持 then 方式
 */
function myAjax(url, callback) {
  var xhr = new XMLHttpRequest()
  return new Promise(function (resolve, reject) {
    xhr.onload = function () {
      callback && callback(this.responseText)
      resolve(this.responseText)
    }
    xhr.onerror = function (error) {
      reject(error)
    }
    xhr.open('GET', url, true)
    xhr.send()
  })
}
