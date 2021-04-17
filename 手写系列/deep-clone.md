# deepClone

深拷贝。

**实现1**：使用 JSON 转换然后解析。缺点：会忽略函数、symbol 等类型，会将 NaN、Infinity 等转成 null 等。

```js
function deepClone(value) {
  const temp = JSON.stringify(value)
  return temp ? JSON.parse(temp) : temp
}
```

**实现2**：递归。

```js
function deepClone(value) {
  if (isPrimitive(value)) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item))
  }

  const obj = {}
  Object.keys(value).forEach(key => {
    obj[key] = deepClone(value[key])
  })

  return obj
}
```

*依赖项：[isPrimitive](手写系列/is-primitive)*