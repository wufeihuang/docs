# cloneFunction

函数的复制。

**实现1**：bind（不考虑 this 的话）

```js
function cloneFunction(fn) {
  return fn.bind(null)
}
```

**实现2**：apply（支持 this）

```js
function cloneFunction(fn) {
  function temp(){
    fn.apply(this, arguments)
  }

  // 如果还要复制其他属性
  Object.keys(fn).forEach(key => {
    temp[key] = fn[key]
  })

  return temp
}
```

还有 eval 和 new Function 的思路。

**实现3**：eval
```js
function cloneFunction(fn) {
  return eval(`(() => ${fn.toString()})()`)
}
```

**实现4**：new Function

```js
function cloneFunction(fn) {
  return (new Function(`return ${fn.toString()}`))()
}
```