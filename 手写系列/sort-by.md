# sortBy

数组按给定顺序排序。

对象数组基于给定id值排序

```js
function sortByKeys(arr, ids, key = 'id') {
  const map = new Map()
  arr.forEach(item => {
    map.set(item[key], item)
  })

  const newArr = []
  ids.forEach(id => {
    newArr.push(map.get(id))
  })

  return newArr
}
```

