# 节流 throttle

持续触发事件时，每隔指定的相同的时间段后都会调用一次处理函数，有比较固定的调用频率。

思路2，基于定时器：

```js
function throttle(fn, delay = 500) {
  let timer = null

  return function(...args) {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
```

思路2，基于时间戳：

```js
function throttle(fn, delay = 500) {
  let lastTime = 0

  return function(...args) {
    if (Date.now() - lastTime < delay) return

    fn.apply(this, args)
    lastTime = Date.now()
  }
}
```

应用场景：
  - 监听页面滚动，计算位置信息或滚动加载数据。
  - 监听视频播放事件。
  - input 实时搜索，并发送请求展示下拉列表。