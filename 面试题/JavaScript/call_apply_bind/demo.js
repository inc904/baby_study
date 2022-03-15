function demo(a, ...args) {
	console.log(arguments)
  console.log(a)
  console.log(args, Array.isArray(args))
  console.log(...args)
}
demo(1, 2, 3, 4)