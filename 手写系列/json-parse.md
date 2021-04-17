# JSON.parse

> JSON-js： https://github.com/douglascrockford/JSON-js/blob/master/json2.js

语法：

```js
// 支持可选的转换器函数 reviver
JSON.parse(str[, reviver])
```

**实现1**：使用 eval。

```js
function jsonParse(str) {
  // 最外层的大括号 '{}' 会被 eval 当做代码块，因此需要用括号括起来
  return eval(`(${str})`)
}
```

**实现2**：使用 Function。

```js
function jsonParse(str) {
  // 立即执行
  return (new Function(`return ${str}`))()
}
```
