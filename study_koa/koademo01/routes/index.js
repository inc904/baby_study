const Router = require('koa-router')
const router = new Router()

router
  .get('/', (ctx, next) => {
    ctx.body = 'hello koa!'
  })

  .get('/news', (ctx) => {
    ctx.body = 'news page!'
  })
module.export = router
