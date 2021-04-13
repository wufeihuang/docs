# apply

用法：`const result = fn.apply(context, argsArray)`

基于 [自定义的 call](手写系列/call.md) 实现：

```js
function apply(fn, context, args) {
  return call(fn, context, ...args)
}
```

单独实现：

```js
function apply(fn, context, args) {
  // 非严格模式
  context = context || globalThis

  const oldProp = context.__fn__
  context.__fn__ = fn

  const result = context.__fn__(...args)

  if (oldProp !== undefined) {
    context.__fn__ = oldProp
  } else {
    delete context.__fn__
  }

  return result
}
```