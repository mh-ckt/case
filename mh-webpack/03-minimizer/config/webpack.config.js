const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const dev = require('./webpack.dev.js')
const prod = require('./webpack.prod.js')
module.exports = (env, argv) => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return merge(common, prod)
    case 'development':
      return merge(common, dev)
    default:
      return new Error('no found')
  }
}
