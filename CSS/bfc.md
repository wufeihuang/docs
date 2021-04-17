# BFC <!-- {docsify-ignore-all} -->

BFC 是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干。

## BFC 渲染规则

- 内部的盒子会在垂直方向，一个接一个地放置；
- 盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠；
- 每个元素的 margin 的左边，与包含块 border 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此；
- BFC 的区域不会与 float 盒子重叠；
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算。

## 如何创建 BFC
  - 根元素：html
  - 非溢出的可见元素：overflow 不为 visible
  - 设置浮动：float 属性不为 none
  - 设置定位：position 为 absolute 或 fixed
  - 定义成块级的非块级元素：display: inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid

## BFC 应用场景

1. 自适应两栏/三栏布局：利用 BFC 不与浮动元素重叠的特点，避免内容“流动”到浮动元素下方，同时可以占满剩余宽度。
2. 清除内部浮动，让父元素高度恢复正常：计算 BFC 的高度时，浮动元素也参与计算 —— 使父元素形成 BFC 即可。
3. 防止垂直 margin 合并：让元素处于不同的 BFC 内。