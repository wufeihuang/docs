# clone

浅拷贝。

```js
// 此处只支持基本的数据结构，日期、正则、Set、Map、ArrayBuffer 等不支持；对象不考虑原型，只复制可枚举的属性。
function clone(value) {
  // 原始类型直接返回。
  if (isPrimitive(value)) {
    return value
  }

  // 数组
  if (Array.isArray(value)) {
    return value.slice()
  }

  // 对象或函数
  const obj = {}
  Object.keys(value).forEach(key => {
    obj[key] = value[key]
  })
  return obj
}
```

*依赖项：[isPrimitive](手写系列/is-primitive)*

数组的复制：

```js
[...arr]

arr.map(item => item)

[].concat(arr)

arr.slice()

Object.values(arr)

Array.from(arr)

for 循环等

```

对象的复制：

```js
{...obj}

Object.assign(obj)

遍历 key

```

函数的复制：函数无法复制，尽管可以使用 Object.assign(fn)，但返回的仍旧是同一个函数。