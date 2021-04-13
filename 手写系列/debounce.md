# 防抖 debounce

持续触发事件时，当事件停止触发达到指定时长才会触发处理函数；每次触发事件都会重新计算事件停止的间隔时长。没有固定的调用频率。

```js
function debounce(fn, interval) {
  let timer = null

  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, interval)
  }
}
```

**发散**：立即调用的防抖函数，事件触发时立即调用处理函数，之后一段时间内的重复触发会被忽略。适用于处理按钮重复点击之类的情况。

```js
function postDebounce(fn, interval) {
  let timer = null
  return function(...args) {
    if (!timer) {
      fn.apply(this, args)
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
    }, interval)
  }
}
```

应用场景：[什么是防抖和节流，他们的应用场景是哪里 \- SegmentFault 思否](https://segmentfault.com/a/1190000023127030)
  - 监听浏览器窗口大小变化的处理。
  - 文本输入等停顿时再触发保存。
  - 防止按钮重复点击等。
