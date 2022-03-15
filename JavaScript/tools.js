/**
 *  判断类型
 *
 * @param {*} target
 * @returns
 */
function myType(target) {
  var template = {
      '[object Array]': 'array',
      '[object Object]': 'object',
      '[object Number]': 'number-object',
      '[object Boolean]': 'boolean-object',
      '[object String]': 'string-onject',
    },
    res = typeof target
  // 分两类： 原始值 和 引用值
  if (target === null) {
    return 'null'
  } else if (res == 'object') {
    // 数组 对象 包装类
    var str = Object.prototype.toString.call(target)
    return template[str]
  } else {
    // 原始值
    return res
  }
}
function unique(target) {}
