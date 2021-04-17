# partial

> 参考 lodash.partial: https://www.lodashjs.com/docs/lodash.partial

偏函数，实际指的是一种操作。基于给定的函数，并返回一个和原函数功能一致但预设了部分参数的新函数。预设参数的个数和位置都是不确定的。

```js
function partial(fn, ...args) {
  return function(...args2) {
    const finalArgs = []
    let indexOfArgs2 = 0
    args.forEach(arg => {
      if (arg === partial.placeholder) {
        // 如果使用了占位值，那么从第二组参数中按顺序取值填充
        finalArgs.push(args2[indexOfArgs2])
        indexOfArgs2++

      } else {
        finalArgs.push(arg)
      }
    })

    // 将第二组参数中剩余的部分追加在最后
    finalArgs.push(...args2.slice(indexOfArgs2))

    return fn.apply(this, finalArgs)
  }
}

// 占位值，使用占位值的参数位置将用最终调用时传入的参数来按顺序填充
// lodash 中使用 _ （lodash 自身）来作为占位置，此处使用 partial 函数自身好了
partial.placeholder = partial
```

示例：

```js
const greet = function(greeting, name) {
  return greeting + ' ' + name
}

const sayHelloTo = partial(greet, 'hello')
sayHelloTo('fred')
// => 'hello fred'
 
// 使用了占位符。
const greetFred = partial(greet, partial, 'fred')
greetFred('hi')
// => 'hi fred'

```