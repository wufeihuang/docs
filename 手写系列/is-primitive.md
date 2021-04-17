# isPrimitive

判断某个值是否原始类型。

```js
function isPrimitive(obj) {
  if ((typeof obj === 'object' && obj) || (typeof obj === 'function')) {
    return false
  }

  return true
}
```