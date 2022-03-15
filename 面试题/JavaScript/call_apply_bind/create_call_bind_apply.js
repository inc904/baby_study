// call
Function.prototype._call = function(context) {
  const cxt = context || window
  console.log('cxt-0:',cxt)
  console.log('this-0:', this)

  cxt.func = this
  console.log('cxt-1:',cxt)
  console.log('cxt.func:',cxt.func)
  console.log('this-1:', this)

  const args = Array.from(arguments).slice(1)
  const res = arguments.length > 1 ? cxt.func(...args) : cxt.func()
  // delete cxt.func
  return res
}
Function.prototype._apply = function(context){
	const cxt = context || window
	// cxt.func = this
	const fn = Symbol() // 指定唯一属性，防止 delete 删除错误
	cxt[fn] = this // 将this 添加到 context 的属性上
	const res = arguments[1] ? cxt.func(...arguments[1]) : cxt.func()
	// delete cxt.func
	delete cxt[fn]
	return res
}

Function.prototype._bind = function(context){
	const cxt = JSON.parse(JSON.stringify(context)) || window
	cxt.func = this
	const args = Array.from(arguments).slice(1)
	return function(){
		const allArgs = args.concat(Array.from(arguments))
		return allArgs.length > 0 ? cxt.func(...allArgs) : cxt.func()
	}
}




