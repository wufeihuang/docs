# isPromise

> https://github.com/then/is-promise/blob/master/index.js

某种意义上这是判断 thenable 对象。但是根据 Promise 规范，（对于 Promise / await 来说）thenable 对象是被要求当作 Promise 处理的，主要是出于对在 Promise 规范出现之前的一些实现的兼容。

具体可参考 is-promise 库作者的回答： https://github.com/then/is-promise/issues/38#issuecomment-619929999

```js
function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
```

如果需要一个严格的 Promise 判断，那可以使用 `obj instanceof Promise`。