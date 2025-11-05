const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production', //将mode设置成生产环境
  module: {
    rules: [
      //配置loader
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    //抽离css文件
    new MiniCssExtractPlugin({
      filename: 'style/[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 添加 CSS 压缩插件
      new TerserPlugin(), // 该插件使用 terser 来压缩 JavaScript。
    ],
  },
}
