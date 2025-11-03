const express = require('express')
const app = express()
const port = 3000

// 用于生成Etag的简单方法
const generateEtag = (content) => {
  return `"${Buffer.from(content).toString('base64')}"`
}

// 1. 不设置任何缓存头（无缓存）
app.get('/no-cache', (req, res) => {
  console.log('请求了 /no-cache 接口')
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache') // 兼容HTTP/1.0
  res.setHeader('Expires', '0') // 立即过期
  res.send('这个响应不会被缓存，每次刷新都会请求服务器')
})

// 2. 强缓存 - 使用Expires（HTTP/1.0）
app.get('/expires', (req, res) => {
  console.log('请求了 /expires 接口')
  // 设置3秒后过期
  const expires = new Date(Date.now() + 3 * 1000).toUTCString()
  res.setHeader('Expires', expires)

  // 核心：仅设置强缓存，不添加任何强制验证的头
  res.setHeader('Cache-Control', 'public, max-age=3') // 3秒内直接用缓存

  // 确保没有协商缓存字段（避免强缓存过期后触发304）
  res.removeHeader('Last-Modified')
  res.removeHeader('Etag')
  res.send(`强缓存3秒，过期后直接请求新资源（不触发304）`)
})

// 3. 强缓存 - 使用Cache-Control（HTTP/1.1）
app.get('/cache-control', (req, res) => {
  console.log('请求了 /cache-control 接口')
  // 设置3秒的最大缓存时间
  res.setHeader('Cache-Control', 'max-age=3')
  res.send(`这个响应使用Cache-Control缓存，3秒内不会再次请求服务器`)
})

// 4. 协商缓存 - Last-Modified & If-Modified-Since
app.get('/last-modified', (req, res) => {
  console.log('请求了 /last-modified 接口')
  // 模拟资源最后修改时间（这里固定为当前时间前5秒，方便测试）
  const lastModified = new Date(Date.now() - 5 * 1000).toUTCString()
  // 检查请求头中的If-Modified-Since
  if (req.headers['if-modified-since'] === lastModified) {
    // 资源未修改，返回304
    res.statusCode = 304
    return res.end()
  }

  // 首次请求或资源已修改，返回完整内容
  res.setHeader('Last-Modified', lastModified)
  res.send(`这个响应使用Last-Modified协商缓存，内容未修改时返回304`)
})

// 5. 协商缓存 - Etag & If-None-Match
app.get('/etag', (req, res) => {
  console.log('请求了 /etag 接口')
  // 模拟资源内容
  const content = '这个响应使用Etag协商缓存，内容未修改时返回304'
  // 生成内容的Etag
  const etag = generateEtag(content)
  // 检查请求头中的If-None-Match
  if (req.headers['if-none-match'] === etag) {
    // 资源未修改，返回304
    res.statusCode = 304
    return res.end()
  }
  // 首次请求或资源已修改，返回完整内容和Etag
  res.setHeader('Etag', etag)
  res.send(content)
})

// 6. 混合使用强缓存和协商缓存
app.get('/combined', (req, res) => {
  console.log('请求了 /combined 接口')
  const content = '这个响应同时使用强缓存和协商缓存'
  const etag = generateEtag(content)

  // 先检查协商缓存
  if (req.headers['if-none-match'] === etag) {
    res.statusCode = 304
    return res.end()
  }

  // 设置强缓存（5秒）+ 协商缓存
  res.setHeader('Cache-Control', 'max-age=5')
  res.setHeader('Etag', etag)
  res.send(content)
})

app.listen(port, () => {
  console.log(`缓存演示服务运行在 http://localhost:${port}`)
  console.log('可访问以下接口测试不同缓存策略：')
  console.log('/no-cache - 无缓存')
  console.log('/expires - Expires强缓存')
  console.log('/cache-control - Cache-Control强缓存')
  console.log('/last-modified - Last-Modified协商缓存')
  console.log('/etag - Etag协商缓存')
  console.log('/combined - 混合缓存策略')
})
