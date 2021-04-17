# unique

数组去重。（这里就2和3两种思路，1是完全不同的语法，不清楚 Set 底层实现，不好对比。）

**实现1**：使用 Set。

```js
function unique(arr) {
  return Array.from(new Set(arr))
  // return [...new Set(arr)]
}
```

**实现2**：for 循环。

```js
function unique(arr) {
  const newArr = []
  for (let value of arr) {
    // 或 indexOf
    if (newArr.includes(value)) continue

    newArr.push(value)
  }
  return newArr
}
```

**实现3**：使用 sort。（for 循环只用遍历一次，sort 遍历几次？）（不适用于对象元素）

```js
function unique(arr) {
  const copy = arr.slice().sort()

  const newArr = copy.length > 0 ? [copy[0]] : []
  for(let i = 1; i < copy.length; i++) {
    if (copy[i] !== copy[i - 1]) {
      newArr.push(copy[i])
    }
  }

  return newArr
}
```

**实现4**：使用 filter。（2 的语法变种）

```js
function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
```

**实现5**：使用 reduce。（2的语法变种）

```js
function unique(arr) {
  return arr.reduce((newArr, curItem) => {
    if (!newArr.includes(curItem)) {
      newArr.push(curItem)
    }
    return newArr
  }, [])
}

```

