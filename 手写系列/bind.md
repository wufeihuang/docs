# bind

用法：`const boundFn = fn.bind(context, arg1, arg2, ...)`

- 只有第一次调用 bind 才会真正绑定 this，后续调用只会追加参数。
- 具有柯里化的特点。
- bind 返回的函数可能被作为构造函数使用 new 调用，此时绑定的 this 需要被忽略。

```js
function bind(fn, context, ...args) {
  /**
   * 当连续调用 bind 时，相当于层层包裹；
   * 而在调用时，则从外向内一层层解开调用，到最内层时参数都合并起来，而 this 最终指向的正是第一次 bind 绑定的 context
   */
  return function(...args2) {
    return fn.call(context, ...args, ...args2)
  }
}
```

兼容作为构造函数的场景：

```js
function bind(fn, context, ...args) {
  // 箭头函数不能作为构造函数，因此这里不适合使用箭头函数。
  return function(...args2) {
    // 借助 new.target 判断是否作为构造函数调用，这种情况下忽略 this 绑定
    if (new.target) {
      return new fn(...args, ...args2)
    }

    return fn.call(context, ...args, ...args2)
  }
}
```

兼容作为构造函数的另一种思路：

```js
function bind(fn, context, ...args) {
  const fBound = function(...args2) {
    return fn.call(this instanceof fBound ? this : context, ...args, ...args2)
  }
  
  // 加一个中间层，避免修改 fBound.prototype 的情况直接影响到 fn.prototype
  // const Noop = function () {}
  // Noop.prototype = fn.prototype

  // fBound.prototype = new Noop()
  fBound.prototype = Object.create(fn.prototype)

  return fBound;
}
```