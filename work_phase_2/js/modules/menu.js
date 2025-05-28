function setupMenu() {
    // 查找菜单切换按钮元素
    const menuToggle = document.querySelector(".menu-toggle");
    // 查找菜单列表元素
    const menu = document.querySelector(".menu");

    // 确保按钮和菜单都存在于页面上
    if (menuToggle && menu) {
        // 为切换按钮添加点击事件监听器
        menuToggle.addEventListener("click", () => {
            // 切换菜单列表上的 'show' 类 (添加或移除)
            menu.classList.toggle("show");
        });

        // 可选功能：当点击菜单或按钮之外的区域时，关闭菜单
        document.addEventListener("click", (event) => {
            // 检查点击事件的目标是否不在菜单内，并且也不在切换按钮内
            if (
                !menu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                // 如果是外部点击，则移除 'show' 类以隐藏菜单
                menu.classList.remove("show");
            }
        });
    }
}

// 导出 setupMenu 函数，使其可以被其他 JS 文件导入使用
export { setupMenu };
