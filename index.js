/**
 * 一个简单的问候函数
 * @param {string} name 要问候的名字
 * @returns {string} 问候语
 */
function sayHello(name) {
  return `Hello, ${name}! Welcome to my first npm package!`;
}

// 将函数作为模块导出，这样其他项目才能引用它
module.exports = { sayHello };