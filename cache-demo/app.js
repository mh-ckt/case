const Koa = require('koa')
const Router = require('koa-router') // 先引入 Router 类
const app = new Koa()
const router = new Router() // 用 new 实例化路由
const fs = require('fs')

// 定义路由
// router.get('/', async (ctx) => {
//   ctx.body = 'Hello Koa Router'
// })

router.get('/', async (ctx) => {
  const getResource = () => {
    return new Promise((res) => {
      fs.readFile('./fs/a.txt', (err, data) => {
        if (err) {
          return
        }
        res(data)
      })
    })
  }
  ctx.set('Cache-Control', 'max-age=10') //设置强缓存，过期时间为10秒
  ctx.body = await getResource()
})

// 应用路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
