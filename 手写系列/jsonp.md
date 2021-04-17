# jsonp

利用 script 标签 src 不受同源策略限制的特点来实现跨域。需要服务端支持。只支持 GET 请求。

```js
function jsonp(url, query, callbackName = 'callback') {
  return new Promise((resolve, reject) => {
    let src = `${url}?callback=${callbackName}`

    if (typeof query === 'object' && query) {
      Object.keys(query).forEach(key => {
        src += `&${key}=${query[key]}`
      })
    }

    const script = document.createElement('script')
    script.src = src

    window[callbackName] = (data) => {
      delete window[callbackName]
      document.body.remove(script)

      if (data) {
        resolve(data)
      } else {
        reject(new Error('没有返回数据'))
      }
    }

    script.onerror = () => {
      delete window[callbackName]
      document.body.remove(script)

      reject(new Error('资源请求失败'))
    }

    document.body.append(script)
  })
}
```