const Koa = require('koa')
const app = new Koa()
const router = require('./routes')

// app.use((ctx) => {
//   ctx.body = 'hello koa2!'
// })

// 应用级中间件
app.use(async (ctx, next) => {
  console.log(new Date())
  await next() // 当前路由 完成以后 继续向下匹配
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
console.log('the server is runing at localhost:3000')
