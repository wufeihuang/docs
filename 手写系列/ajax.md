# ajax

老 IE 需要用 ActiveXObject，但是让过去过去吧。

更完善的实现应参考 axios。

```js
interface IResponse {
  data: any
  status: number
  statusText: string
  headers: any
}

interface IRequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'HEAD' | 'PUT' | 'PATCH' | 'DELETE' | 'get' | 'post' | 'head' | 'put' | 'patch' | 'delete'
  headers?: any
  params?: any
  data?: any
  timeout?: number
  responseType?: '' | 'text' | 'json' | 'arraybuffer' | 'blob' | 'document'
  
  success?(response: IResponse): void
  fail?(error: any): void
  complete?(): void
}
  
const defaultConfig: IRequestConfig = {
  method: 'GET',
  timeout: 3000,
  responseType: '',
}

function ajax(config: IRequestConfig) {
  config = Object.assign({}, defaultConfig, config)
  
  const xhr = new XMLHttpRequest()
  
  xhr.open(config.method.toLowerCase(), buildUrl(config.url, config.params), true)
  
  if (config.headers) {
    for(let [name, value] of Object.entries(config.headers)) {
      xhr.setRequestHeader(name, value)
    }
  }
  
  xhr.timeout = config.timeout
  
  xhr.responseTyppe = config.responseType
  
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === 4) {
  //     if (xhr.status !== 200) {
  //       config.fail()
  //     } else {
  //       config.success()
  //     }
  //   }
  // }
  
  xhr.onload = () => {
    if (!config.success) return

    const headers = parseHeaders(xhr.getAllResponseHeaders())
    
    config.success({
      data: xhr.response,
      status: xhr.status,
      statusText: xhr.statusText,
      headers,
    })
  }
  
  xhr.onerror = config.fail
  
  xhr.onloadend = config.complete
  
  const requestData = config.data || null
  xhr.send(requestData)
  
  return xhr.abort.bind(xhr)
}


function buildUrl(url, params) {
  if (!params) return url
  
  let queryString = ''
  for(let [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    if (value === null) {
      value = ''
    }
    
    if (queryString) {
      queryString += `&${key}=${value}`
    } else {
      queryString += `${key}=${value}`
    }
  }
  
  return `${url}?${queryString}`
}

function parseHeaders(headersString) {
  if (!headersString) return {}

  return headersString
    .split('\r\n')
    .reduce((result, current) => {
      const [name, value] = current.split(': ')
      result[name] = value
      return result
    }, {})
}
```