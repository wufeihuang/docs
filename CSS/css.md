# CSS <!-- {docsify-ignore-all} -->

> 参考：[1\.5 万字 CSS 基础拾遗](https://mp.weixin.qq.com/s/fwlH6gfE7Mm7dwfhngqksA)

## 语法

- 声明（declaration）：属性与值的键值对。
- 声明块（declaration block）：用大括号包裹一个或多个声明。
- CSS 规则集（CSS ruleset）：选择器 + 声明块。
- 注释（comment）。

## @规则

- @namespace
- @media
- @page
- @font-face
- @keyframes
- @document
- @charset
- @import
- @supports

## 层叠性

根据层叠性决定生效的属性值。

- userAgent（浏览器）样式表中的声明 < 作者样式表（开发者设置的样式表）中的常规声明 < 作者样式表中的 !important 声明。
- 选择器优先级、继承性、声明的定义顺序等。

## 选择器

### 基础选择器

- 标签选择器：`h1`
- 类选择器：`.class`
- ID 选择器: `#id`
- 通配选择器：`*`

### 属性选择器

- `[attr]`：具备指定属性
- `[attr=val]`：属性等于指定值
- `[attr*=val]`：包含指定值
- `[attr^=val]`：以指定值开头
- `[attr$=val]`：以指定值结尾
- `[attr~=val]`：属性是一个以空格分隔的值列表，且其中至少一个值为 val
- `[attr|=val]`：属性值以 val 或 val- 开头

### 组合选择器

- 相邻兄弟选择器：`A + B` （匹配同一个父元素下，紧跟在 A 后的 B元素）
- 普通兄弟选择器：`A ~ B` （匹配同一个父元素下，在 A 元素之后的 B元素）
- 子选择器：``A > B`
- 后代选择器：`A B`

### 伪类

#### 条件伪类

- `:lang()`：基于元素语言来匹配页面元素
- `:dir()`：匹配特定文字书写方向的元素
- `:has()`：匹配包含指定元素的元素
- `:is()`
- `:not()`

#### 行为 & 状态伪类

- `:link`：未访问的链接元素（链接元素的伪类通常应该按：:link - :visited - :hover - :active 的顺序声明）
- `:active`：鼠标激活的元素（鼠标按下到松开期间）
- `:visited`：已访问的链接元素
- `:hover`：鼠标悬浮的元素
- `:focus`
- `:checked`

#### 结构伪类

- `:root`：文档根元素
- `:empty`：无子元素的元素
- `:nth-child(an+b|even|odd)`：首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从1开始排序
- `:nth-last-child(an+b)`
- `:first-child`
- `:last-child`
- `:only-chid`
- `:nth-of-type(an+b)`：匹配相同标签的兄弟元素
- `:nth-last-of-type(an+b)`
- `:first-of-type`
- `:last-of-type`
- `:only-of-type`


### 伪元素

- `::before`
- `::after`
- `::selection`：鼠标选中的元素
- `::first-letter`
- `::first-line`
- `::placeholder` （试验属性）

## 优先级

- 10000：!important
- 01000：内联样式
- 00100：ID 选择器
- 00010：类选择器、伪类选择器、属性选择器
- 00001：元素选择器、伪元素选择器
- 00000：通配选择器、后代选择器、兄弟选择器

## 继承性

具有默认继承行为的属性：

- 字体相关：font-*
- 文本相关：text-*、color、line-height、white-space、letter-spacing 等
- 列表相关：list-*
- 其他属性：visibility、cursor、pointer-events 等

主动控制继承行为：

- `inherit`：继承
- `initial`：使用默认值，比如 color 默认值为 #000
- `unset`：如果属性可以继承，则取 inherit 效果，否则同 initial
- `revert`：等同于 unset，兼容性差

## 文档流

正常文档流：默认是从上到下、从左到右的流式布局。

- 块级元素默认占满整行。
- 内联元素默认会在一行里一列一列地排布，一行放不下后自动切换到下一行。

**脱离文档流**：指节点脱离正常文档流，在正常文档流的其他节点将忽略该节点并填补其原先空间。文档一旦脱离，计算其父节点高度时不会将其高度纳入，脱离节点不占空间。两种方式：

- 浮动（float）：元素移动到容器左/右侧边界或另一个浮动元素旁边。浮动元素之前占有的空间被其他元素填补，浮动后占用的区域不会和其他元素重叠。
- 绝对定位（positon: absolute）或固定定位（position: fixed）。

## 盒模型

CSS 元素盒子组成：内容（content）、内边距（padding）、边框（border）、外边距（margin）。

标准盒模型：（`box-sizing: content-box`），盒子实际尺寸 = 内容（设置的width/height）+ 内边距 + 边框。

IE 盒模型：（`box-sizing: border-box`），盒子的实际尺寸 = 设置的width/height = 内容 + 内边距 + 边框。

现代浏览器基本默认使用标准盒模型，IE6 才默认使用 IE 盒模型。

## 视觉格式模型

视觉格式模型（Visual formatting model）是用来处理和在视觉媒体上显示文档时使用的计算规则。

使用 display 决定盒子类型，决定盒子的2个显示类型（display type）：

- outer display type（对外显示）：决定元素自身如何布局。
- inner display type（对内显示）：将元素当成容器，决定内部子元素如何布局。

*比如：`display: block` 实际上相当于 `display: block flow`。*

- 块级盒子：display 为 block、list-item、table、flex、grid、flow-root 等。
- 行内级盒子：display 为 inline、inline-block、inline-table 等。

## 格式化上下文

- BFC（Block Formatting Context） 块级格式化上下文
- IFC（Inline Formatting Context） 行内格式化上下文
- FFC（Flex Formatting Context） 弹性格式化上下文
- GFC（Grid Formatting Context） 栅格格式化上下文

### BFC

BFC 是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干。

#### BFC 渲染规则

- 内部的盒子会在垂直方向，一个接一个地放置；
- 盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠；
- 每个元素的 margin 的左边，与包含块 border 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此；
- BFC 的区域不会与 float 盒子重叠；
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算。

#### 如何创建 BFC
  - 根元素：html
  - 非溢出的可见元素：overflow 不为 visible
  - 设置浮动：float 属性不为 none
  - 设置定位：position 为 absolute 或 fixed
  - 定义成块级的非块级元素：display: inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid

#### BFC 应用场景

1. 自适应两栏/三栏布局：利用 BFC 不与浮动元素重叠的特点，避免内容“流动”到浮动元素下方，同时可以占满剩余宽度。
2. 清除内部浮动，让父元素高度恢复正常：计算 BFC 的高度时，浮动元素也参与计算 —— 使父元素形成 BFC 即可。
3. 防止垂直 margin 合并：让元素处于不同的 BFC 内。

### IFC

IFC 的形成条件非常简单，块级元素中仅包含内联级别元素，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个 IFC。

#### IFC 渲染规则

#### IFC 应用场景

- 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过 text-align 则可以使其水平居中。
- 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align: middle，其他行内元素则可以在此父元素下垂直居中。

## 层叠上下文

层叠等级、层叠顺序、z-index 等。

## 值和单位

值的类型：

- 数值
- 百分比
- 颜色
- 坐标位置
- 函数

单位：

- px
- em
- rem：基于 html 根元素的 font-size 计算。
- vw/vh/vmin/vmax
  - vmin = min(vw, vh)
  - vmax = max(vw, vh)

## 颜色体系

- 颜色关键字
- transparent 关键字
- currentColor 关键字
- RGB 颜色：十六进制颜色属于 RGB 颜色
- HSL 颜色

## 媒体查询

可以在样式表中写 @media 规则；还可以在 \<link> 标签中添加 media 属性指定样式文件使用的设备。

