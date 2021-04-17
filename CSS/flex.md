# Flex <!-- {docsify-ignore-all} -->

> [A Complete Guide to Flexbox \| CSS\-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 基本概念

- main axis 主轴
- main-start | main-end
- main size
- cross axis 交叉轴
- cross-start | cross-end
- cross size

主轴和交叉轴的方向是由 flex-direction 决定的，row 时主轴为水平方向，column 时主轴为垂直方向。

## 用于 flex container 的属性

- `display`: flex | inline-flex
- `flex-direction`: row | column | row-reverse | column-reverse
- `flex-wrap`: nowrap | wrap | wrap-reverse
- `flex-flow`: [flex-direction] [flex-wrap]
- `justify-content`: flex-start | flex-end | center | space-between | space-around | space-evenly | ... （控制每一行在主轴上的对齐方式）
- `align-items`: stretch | flex-start | flex-end | center | baseline | ... （控制各行在交叉轴上的对齐方式）
- `align-content`: normal | flex-start | flex-end | center | stretch | space-between | space-around | space-evenly | ... （控制包括所有行的整体在交叉轴上的对齐方式）

## 用于 flex items 的属性

float、clear、vertical-align 对 flex item 无效。

- `order`: 0 | \<number>
- `flex-grow`: 0 | \<number>  （撑开，不支持负数）
- `flex-shrink`: 1 | \<number>  （收缩，不支持负数）
- `flex-basis`: auto | \<size value> （如果设为0，将不纳入额外空间；如果设为 auto，则由 flex-grow 决定）
- `flex`: none | [\<flex-grow> \<flex-shrink>? \<flex-basis>?]
- `align-self`: auto | flex-start | flex-end | center | baseline | stretch