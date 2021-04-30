# HTTP Headers

HTTP 消息头允许客户端和服务器通过 request 和 response 传递附加信息。

一个请求头由名称（不区分大小写）后跟一个冒号“:”，冒号后跟具体的值（不带换行符）组成。该值前面的引导空白会被忽略。

- Accept
- Accept-Encoding
- Accept-Language

- Access-Control-Allow-Credentials
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Max-Age
- Access-Control-Expose-Headers
- Access-Control-Request-Method
- Access-Control-Request-Headers

- Authorization

- Cache-Control

- Connection

- Content-Encoding
- Content-Language
- Content-Length
- Content-Type

- Cookie

- Date
- ETag
- Expires
- Host
- If-Match
- If-Modified-Since
- If-None-Match
- If-Range
- If-Unmodified-Since
- Last-Modified
- Origin
- Referer （单词实际拼写错误，应该是 referrer，但是历史问题没办法）
- Set-Cookie
- Upgrade
- User-Agent

Host、Origin、Referer：

- Host：域名+端口号。基于 Host 决定信息请求的最终地址（ip）


- Referer：当前请求的来源页面地址（不包括hash部分）。英语识别访问来源，可以借此进行统计分析、日志记录、缓存优化，以及图片防盗链等。缺点：url 中可能带有很多信息，携带完整 url 会暴露一些信息。

- origin：协议+域名+端口号。不包含路径信息。只有跨域请求或者同域是发送 post 请求时才会携带 origin 请求头。
