const router = require('koa-router')()

router.prefix('/api')

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

router.get('/cancel', async (ctx, next) => {
  await sleep(3000)
  ctx.body = {}
})

module.exports = router
