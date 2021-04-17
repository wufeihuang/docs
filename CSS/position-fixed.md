# position: fixed <!-- {docsify-ignore-all} -->

指定元素相对于屏幕视口（viewport）的位置来指定元素位置。

## 特殊情况：

当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。也就是这种情况下，fixed 定位不是相对于屏幕视口了。

## z-index 问题

虽然 fixed 定位元素的位置默认是相对于屏幕的，但是它的 z-index 依旧受限于 非static定位 的祖先元素的 z-index。这是由层叠上下文的规则决定的。