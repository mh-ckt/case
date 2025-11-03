## webpack 文件拆分

#### 为什么需要拆分 Webpack 配置？

在使用 Webpack 时，将配置文件拆分为多个（如通用配置、开发环境配置、生产环境配置等）是一种最佳实践，主要原因如下：

1. 避免重复代码，提高复用性：

开发环境（development）和生产环境（production）的 Webpack 配置中，存在大量共通逻辑，例如：

- 入口文件（entry）、输出路径（output）的基本设置
- 模块解析规则（如处理 CSS、JS、图片的 module.rules）
- 插件（如 HtmlWebpackPlugin 生成 HTML 的基础配置）

2. 清晰区分环境差异，降低维护成本：

开发和生产环境的需求差异很大：

- 开发环境：需要更快的构建速度（如 eval-cheap-module-source-map 生成 source-map）、热更新（webpack-dev-server）、不压缩代码等，方便调试。
- 生产环境：需要代码压缩（TerserPlugin）、Tree-Shaking 优化、提取 CSS 为单独文件（MiniCssExtractPlugin）、缓存策略（contenthash）等，追求性能和体积优化。

#### 配置拆分的核心思路

拆分的基本原则是「抽离共性，区分差异」，通常我们会将配置拆分为 4 个文件：

- webpack.common.js：存放开发和生产环境的通用配置（公共逻辑）
- webpack.dev.js：存放开发环境专属配置
- webpack.prod.js：存放生产环境专属配置
- webpack.config.js 不同 webpack 文件的组合

#### 实战：手把手实现配置拆分

**步骤 1：安装依赖**

核心依赖是 webpack-merge—— 它能智能合并 Webpack 配置（比如数组会合并而非覆盖，对象会深度合并），避免手动合并的繁琐。

```js
npm install webpack-merge --save-dev
```

**步骤 2：创建通用配置（webpack.common.js）**

```js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') //引入
module.exports = {
  entry: './src/index.js', //需要打包文件的入口路径
  output: {
    filename: 'bundle.js', //打包后文件的名称
    path: path.resolve(__dirname, '../dist'), //打包后文件的输出路径
    clean: true, // 清理打包后上次遗留的js和html文件
  },
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
```

**步骤 3：开发环境配置（webpack.dev.js）**

```js
module.exports = {
  mode: 'development', //将mode设置成开发环境
}
```

**步骤 4：生产环境配置（webpack.prod.js）**

```js
module.exports = {
  mode: 'production', //将mode设置成生产环境
}
```

**步骤 5：合并配置（webpack.config.js）**

```js
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
```

**步骤 6：配置命令脚本**

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack serve -c ./config/webpack.config.js --mode=development",
    "build": "webpack -c ./config/webpack.config.js --mode=production"
  },
```

- 开发时运行 npm run dev：使用「通用配置 + 开发配置」，启动开发服务器
- 打包时运行 npm run build：使用「通用配置 + 生产配置」，生成优化后的 dist 目录
