const router = require('koa-router')()

router.prefix('/api')

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

router.get('/cancel', async (ctx, next) => {
  await sleep(3000)
  ctx.body = {}
})

router.post('/interceptor', async (ctx, next) => {
  // 原样返回
  ctx.body = {
    code: 200,
    data: ctx.request.body.body,
    message: '获取成功'
  }
})

module.exports = router
