console.log('初始化webpack');

import './style/index.css'
import './style/index.less'

/**
 * 向body中插入一个div
 */
var box = document.createElement("div"); // 创建一个div标签
box.classList.add("box"); // 添加div的class
document.body.appendChild(box); // 向body中添加一个dev