# Object.create

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

原生的 Object.create(null) 会创建一个没有原型的空对象，但以下 polyfill 不支持：虽然 F.prototype 可以设为 null，但是 new F() 返回的对象依旧是有 `__proto__` 的，且指向 Object.prototype，相当于普通的空对象。

```js
if (typoef Object.create !== 'function') {
  // 这里不支持第二个参数
  Object.create = function(proto) {
    // 省略类型检查
    const F = function(){}
    F.prototype = proto
    return new F()
  }
}
```