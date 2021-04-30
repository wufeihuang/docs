# HTTP 缓存

> [HTTP 缓存 \- HTTP \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)

缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。

当 web 缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。

优点：缓解服务器端压力；提升性能（获取资源耗时更短）。

类别：私有和共享缓存。共享缓存存储的响应能够被过个用户使用；私有缓存只能用于单个用户。

除了浏览器与代理缓存，还有网关缓存、CDN、反向代理缓存和负载均衡器等部署在服务器上的缓存方式。

## （私有）浏览器缓存

私有缓存只能用于单独用户。

浏览器缓存拥有用户通过 HTTP 下载的所有文档。这些缓存为浏览过的文档提供向后/向前导航，保存网页，查看源码等功能，可以避免再次向服务器发起多余的请求。它同样可以提供缓存内容的离线浏览。

## （共享）代理缓存

共享缓存可以被多个用户使用。

例如，公司可能会架设一个 web 代理来作为本地网络基础的一部分提供给用户。这样人们资源就会被重复使用，减少网络拥堵与延迟。

## 缓存操作的目标

常见的 HTTP 缓存只能存储 GET 响应。

## 缓存控制

HTTP/1.1 定义的 `Cache-Control` 头用来区分对缓存机制的支持情况。请求头和响应头都支持这个属性。

- `Cache-Control: no-store`  完全不使用缓存
- `Cache-Control: no-cache`  缓存，但是请求时要重新验证（走协商缓存）
- `Cache-Control: private`  表示该响应是专用于单个用户的，中间人不能缓存此响应，该响应只能应用与浏览器私有缓存中。
- `Cache-Control: public`  表示该缓存可以被任何中间人（如中间代理、CDN等）缓存。带有 HTTP 验证信息的页面或某些特定状态码的页面通常不会被中间人缓存，但指定 public 的话就可以被缓存。
- `Cache-Control: max-age=<seconds>` 表示资源能被缓存的最大时间。（强缓存，优先级高于 Expires）
- `Cache-Control: must-revalidate`  表示缓存在考虑使用一个陈旧的资源时，必须先验证它的状态（需要缓存验证）。

- `Pragma` 头，HTTP/1.0 中定义的一个 header 属性，请求汇总包含 Pragma 的效果跟在头信息中定义 Cache-Control: no-cache 相同。通常定义这个用于向后兼容。

缓存验证：当缓存的文档过期后，需要进行缓存验证或重新获取资源。只有在服务器返回强校验（ETag）或者弱校验器（Last-Modified）时才会进行校验。

## 其他

强缓存：Cache-Control: max-age=\<seconds\>，Expires

协商缓存：ETag / If-None-Match，Last-Modified / If-Modified-Since

Last-Modified 只能精确到一秒，所以不如 ETag 精确，但 ETag 生成和比较更费时间。