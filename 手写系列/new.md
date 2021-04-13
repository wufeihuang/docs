# new

```js
function new2(Func, ...args) {
  const instance = {}

  Object.setPrototypeOf(instance, Func.prototype)

  const result = Func.apply(instance, args)

  // 如果 Func 直接返回 this，那么 result === instance，此时也已经绑定了原型了
  return result instanceof Object ? result : instance
}
```