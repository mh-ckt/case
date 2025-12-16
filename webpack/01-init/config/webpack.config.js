const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') //引入
module.exports = {
  entry: './src/index.js', //需要打包文件的入口路径
  output: {
    filename: 'bundle.js', //打包后文件的名称
    path: path.resolve(__dirname, '../dist'), //打包后文件的输出路径
    clean: true, // 清理打包后上次遗留的js和html文件
  },
  mode: 'production', // 开发环境（不压缩，保留注释） 或 'production'（默认，自动压缩、优化）、'none'（无优化）
  plugins: [
    //配置打包后的html文件
    new htmlWebpackPlugin({
      template: './index.html', //指定打包前使用的html模版
      // filename:'index.html',  //打包后的html文件名
      // inject:'body'   //这里指的是将打包后的script标签添加的位置
    }),
  ],
  devServer: {
    open: true, // 启动项目的同时自动打开浏览器
    host: 'localhost', // 设置服务器主机地址
    port: 3000, // 设置服务器端口
    hot: true, // 开启热模块替换
  },
}
