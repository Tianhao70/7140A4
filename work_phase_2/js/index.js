/**
 * IMPORTS
 * 追踪正在使用的外部模块
 */
import { setupMenu } from './modules/menu.js'; // 从 menu.js 模块导入 setupMenu 函数

/**
 * CONSTANTS
 * 定义不改变的值，例如页面标题、URL 等
 */

/**
 * VARIABLES
 * 定义会改变的值，例如用户输入、计数器等
 */

/**
 * FUNCTIONS
 * 将代码分组到函数中以使其可重用
 */

/**
 * EVENT LISTENERS
 * 当用户与页面交互时运行的代码
 */
// 当页面完全加载后执行
document.addEventListener("DOMContentLoaded", () => {
    setupMenu(); // 调用导入的 setupMenu 函数来初始化菜单
});