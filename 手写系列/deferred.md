# deferred

对 Promise 的封装使用，使得可以在 Promise 外部任意地方调用 resolve/reject。可以用来将某些原本只支持回调的函数转成支持 Promise 用法。

作为函数：

```js
function deferred() {
  const obj = {}
  obj.promise = new Promise((resolve, reject) => {
    obj.resolve = resolve
    obj.reject = reject
  })

  return obj
}
```

作为类：

```js
class Deferred {
  promise
  resolve
  reject

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
```

一个非常有用的场景就是将使用 success/fail 回调函数的方法转成 promise：

```js
function promiseAjax(url) {
  const deferred = new Deferred()
  $.ajax({
    url,
    success: deferred.resolve,
    fail: deferred.reject,
  })

  return deferred.promise
}

```