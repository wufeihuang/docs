# curry

柯里化，把接受多个参数的函数拆成一系列接收单个参数的函数。f(a, b, c) => g(a)(b)(c)。

柯里化需要明确知道函数参数个数（使用 fn.length 获取，这不包含 ...rest 参数）。

```js
// 这里不是严格的 currying，这允许拆出的函数支持不止一个参数。
function curry(fn) {
  let args = []
  return function curried(...args) {
    if (args.length >= fn.length) {
      fn.apply(this, args)
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
```