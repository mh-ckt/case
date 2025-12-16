module.exports = {
  mode: 'development', //将mode设置成开发环境
  module: {
    rules: [
      //配置loader
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
}
