# @import 和 link 的区别

都能引入一个外部CSS样式文件。

- link 是 HTML 标签，还可以引入 CSS 以外的其他资源；@import 是 CSS 语法，只能导入 CSS。
- link 导入的样式会在页面加载时同时加载；@import 导入的样式需等页面加载完成后再加载。
- link 可以通过 JS 操作 DOM 动态引入样式表改变样式；而 @import 不可以。
- link 没有兼容性问题；@import 不兼容 ie5 以下。