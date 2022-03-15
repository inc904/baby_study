const Router = require('koa-router')
const router = new Router()
router
  .get('/', (ctx, next) => {
    ctx.body = 'this is  / page !'
  })

  .get('/news', (ctx, next) => {
    ctx.body = 'this is news page!'
  })

  .get('/abc', (ctx, next) => {
    ctx.body = 'this is abc page!'
  })

  .get('/aaa', (ctx, next) => {
    console.log(new Date())
  })

  .get('/newscontent', (ctx, next) => {
    let url = ctx.url
    //从request中获取GET请求
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring
    //从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
      url,
      req_query,
      req_querystring,
      ctx_query,
      ctx_querystring,
    }
  })
  .get('/product/:aid', async (ctx) => {
    console.log(ctx.params) //{ aid: '123' }  //获取动态路由的数据
    ctx.body = `这是商品:${ctx.params.aid} 页面`
  })

module.exports = router
