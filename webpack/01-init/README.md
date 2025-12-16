## 环境搭建&初体验

**一. 安装 Node.js：** webpack 基于 node 运行。

**二. 初始化项目**

```js
mkdir 01-init && cd 01-init
npm init -y  // 生成 package.json
```

**三. 安装 webpack 的核心包及插件**

```js
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
// webpack-cli 是命令行工具
// webpack-dev-server 提供一个本地开发服务器，支持热更新（Hot Module Replacement）和实时重载
// html-webpack-plugin 处理html文件与其他资源文件的关联
```

**四. 创建目录结构**

```
01-init
├── src/  # 源代码目录（开发时主要操作的目录）
│ └── index.js # 入口文件
├── config/  # 配置文件目录
│ └── webpack.config.js # Webpack 核心配置文件
├── index.html # HTML 模板文件（通常配合 html-webpack-plugin 使用）
└── dist/ # 打包输出目录（自动生成）
```

- 在 src/index.js 中写简单代码：`console.log('Hello Webpack!')`

**五. 理解核心配置文件（webpack.config.js）**

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
  mode: 'development', // 开发环境（不压缩，保留注释） 或 'production'（默认，自动压缩、优化）、'none'（无优化）
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

- 运行配置：修改 package.json 的 scripts 命令：

```json
"scripts": {
    "dev": "webpack serve -c ./config/webpack.config.js",
    "build": "webpack -c ./config/webpack.config.js"
  },
```

**六、在终端执行命令:** `npm run build`
此时可以看见打包后的 dist 文件夹。
