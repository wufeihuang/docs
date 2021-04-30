# HTTP 状态码

> [HTTP 响应代码 \- HTTP \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

HTTP 响应状态代码指示特定 HTTP 请求是否已成功完成。

响应分为5类：

- 信息响应（100-199）
- 成功响应（200-299）
- 重定向（300-399）
- 客户端错误（400-499）
- 服务器错误（500-599）

状态码由 [section 10 of RFC 2616](https://tools.ietf.org/html/rfc2616#section-10) 定义。

## 信息响应 1xx

- 100 Continue：表示到目前为止都正常，客户端应继续请求。
- 101 Switching Protocol：由客户端的 Upgrade 头发送，并指示服务器也正在切换的协议。
- 102 Processing：表示服务器已收到并正在处理该请求，但没有响应可用
- 103 Early Hints

## 成功响应 2xx

- 200 OK：请求成功。
- 201 Created：请求成功，并因此创建了一个新的资源。
- 202 Accepted：请求已收到，但还未响应，没有结果。
- 203 Non-Authoritative Information
- 204 No Content
- 205 Reset Content
- 206 Partial Content
- 207 Multi-Status
- 208 Already Reported
- 226 IM Used

## 重定向 3xx

- 300 Multiple Choice
- 301 Moved Permanently：资源已永久移动到新位置。如果可能，客户端应当自动把请求地址修改为从服务器反馈回来的地址。默认这个响应可缓存。
- 302 Found：从临时的 URI 响应请求。临时重定向，客户端应继续向原有地址发送以后的请求。只在 Cache-Control 或 Expires 进行了指定的情况下这个响应才可缓存。
- 303 See Other：（302 的细化，POST 请求应被转为 GET）
- 304 Not Modified：当客户端发送了一个带条件的 GET 请求且该请求已被允许，若文档内容（自上次访问以来或根据请求的条件）并没有改变，则服务器应返回这个状态码。（协商缓存，If-Modified-Since，If-None-Match）
- 307 Temporary Redirect：临时重定向，（302 的细化， POST 请求不会被转为 GET）
- 308 Permanent Redirect：永久重定向，和 301 语义一致，但客户端不能更改使用的 HTTP 方法。

## 客户端响应 4xx

- 400 Bad Request：语义错误或参数错误，无法被服务器理解。
- 401 Unauthorized：需要用户验证。
- 403 Forbidden：服务器已理解请求，但拒绝执行它。
- 404 Not Found：请求的资源在服务器上不存在。
- 405 Method Not Allowed：请求的方法不能被用于请求响应的资源。
- 408 Request Timeout：请求超时。

## 服务端响应 5xx

- 500 Internal Server Error：服务器内部错误。
- 501 Not Implemented：请求方法不被服务器支持。
- 502 Bad Gateway：网关错误。表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。
- 503 Service Unavailable：服务器不可用。服务器在维护或重载或者被攻击而挂掉。
- 504 Gateway Timeout：服务器作为网关，不能及时得到响应。

