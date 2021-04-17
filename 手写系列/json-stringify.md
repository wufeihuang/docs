# JSON.stringify

> 完整的 polyfill 库：[JSON-js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)


语法：

```js
JSON.stringify(obj[, replacer, space])
```

JSON 是一种通用的数据格式，所以 js 特有的东西（undefined、函数、symbol）会被忽略掉或进行转换（BigInt 会报错）。具体规则可参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#%E6%8F%8F%E8%BF%B0)。

```js
function jsonStringify(obj) {
  const type = typeof obj

  if (type === 'string') {
    return `"${obj}"`
  }

  if (type === 'number') {
    if (Number.isNaN(obj) || !Number.isFinite(obj)) {
      return 'null'
    }
    return obj.toString()
  }

  if (type === 'boolean') {
    return obj.toString()
  }

  if (type === 'null') {
    return 'null'
  }

  if (type === 'object') {
    if (obj.toJSON && typeof obj.toJSON === 'function') {
      return jsonStringify(obj.toJSON())
    }

    if (Object.prototype.toString.call(obj) === '[object Object]') {
      let keyValues = []
      Object.keys(obj).forEach(key => {
        const value = jsonStringify(obj[key])
        if (value !== undefined) {
          const key2 = jsonStringify(key)
          keyValues.push(`${key2}:${value}`)
        }
      })
      return `{${keyValues.join(',')}}`
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return '[]'
      }
      const value0 = jsonStringify(obj[0])
      let items = value0 === undefined ? 'null' : value0

      for (let i = 1; i < obj.length; i++) {
        const value = jsonStringify(obj[i])
        const valueString = value === undefined ? 'null' : value
        items += `,${value}`
      }
      return `[${items}]`
    }
  }
}
```

**扩展**：处理 JSON.stringify 循环引用报错的问题。参考 stackoverflow：https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format 。

```js
// 此处选择 MDN 上提供的解决方案
function getCircularReplacer() {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

JSON.stringify(obj, getCircularReplacer())
```

如果要支持追踪，可以稍加调整：

```js
function getCircularReplacer() {
  const seen = new WeakMap()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[@Circular ' + seen.get(value) + ']'
      }
      seen.set(value, key || 'root')
    }
    return value
  }
}
```

目前这类方案虽然可以解决循环引用报错问题，但是存在非循环引用也被误处理的情况。所以要根据实际情况选择性使用。

```js
// 误处理示例
const a = {x: 100}
const b = [a, a]

JSON.stringify(b, getCircularReplacer()) // "[{"x":100},"[@Circular 0]"]"
```

虽然也可以使用 try...catch 来进行一定的优化（try 内用 JSON.stringify，如果捕获到循环引用错误，则尝试用上述方案），但毕竟始终是无法确定是否同时存在循环引用和非循环的相同对象引用。