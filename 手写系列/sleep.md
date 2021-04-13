# Sleep

睡眠函数，等待一段时间。

异步实现：

```js
function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
```

同步实现：

```js
function sleepSync(duration) {
  const start = Date.now()
  while(true) {
    if (Date.now() - start >= duration) {
      break
    }
  }
}
```