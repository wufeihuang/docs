# arrayToMap

将对象数组转换成基于某个属性值为key的对象。

转成普通 Object 结构。

```js
function arrayToMap(arr, key = 'id') {
  const obj = {}
  arr.forEach(item => {
    obj[item[key]] = item
  })

  return obj
}
```

转成 Map 结构。

```js
function arrayToMap(arr, key = 'id') {
  const map = new Map()
  arr.forEach(item => {
    map.set(item[key], item)
  })

  return map
}
```