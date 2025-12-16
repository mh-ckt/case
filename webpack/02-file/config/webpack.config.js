const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const dev = require('./webpack.dev.js')
const prod = require('./webpack.prod.js')
module.exports = (env, argv) => {
  switch (argv.mode) {
    case 'production':
      return merge(common, prod)
    case 'development':
      return merge(common, dev)
    default:
      return new Error('no found')
  }
}
