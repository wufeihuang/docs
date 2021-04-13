# call

用法：`const result = fn.call(context, arg1, arg2, ...)`

```js
function call(fn, context, ...args) {
  // 严格模式
  // if (!context) {
  //   return fn(...args)
  // }

  // 非严格模式
  context = context || globalThis

  // 取出 context 上可能存在的 __fn__ 属性
  const oldProp = context.__fn__

  context.__fn__ = fn
  const result = context.__fn__(...args)

  if (oldProp !== undefined) {
    // 如果之前存在 __fn__ 属性，那么将原来的值放回去
    context.__fn__ = oldProp
  } else {
    delete context.__fn__
  }

  return result
}
```