# promisify

将使用回调的函数转换成 Promise。因为函数入参各式各样，不存在完全通用的的 promisify 函数。此处实现适用于 Node 风格的函数：回调函数为最后一个参数，且回调函数的参数为 error 优先。

```js
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }
      
      args.push(callback)
      fn.apply(this, args)
    })
  }
}

// 示例
const readFile = promisify(fs.readFile)
readFile('readme.md').then(data => {}).catch(err => {})
```