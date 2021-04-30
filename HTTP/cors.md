# 跨源资源共享（CORS）

> [跨源资源共享（CORS） \- HTTP \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

（通常被称为跨域资源共享，但 origin 翻译成源确实要更准确。）

源（Origin）：协议、域名和端口组成源。其中任意一部分不相同，就不是同源。

同源策略：出于安全性，浏览器限制脚本内发起的跨源 HTTP 请求。

## 什么情况下需要 CORS？

- 由 XMLHttpRequest 或 Fetch 发起的跨源请求
- Web 字体（CSS 中通过 @font-face 使用跨源字体资源）
- WebGL 贴图
- 使用 drawImage 将 Images/video 画面绘制到 canvas

## 功能概述

CORS 标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法，浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨源请求。服务器确认允许之后，才发起实际的 HTTP 请求。

## 简单请求

不会触发 CORS 预检请求。

当满足以下所有条件，则该请求可视为简单请求：

- 使用以下方法之一：
  - GET
  - HEAD
  - POST
- 除了被用户代理自动设置的首部字段（如 Connection、User-Agent）和在 Fetch 规范中定义为 禁用首部名称的其他首部，允许认为设置的字段为 Fetch 规范定义的 对 CORS 安全的首部字段集合。该集合为：
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type（有限制）
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width
- Content-Type 的值仅限于下列三者之一：
  - `text/plain`
  - `multipart/form-data`
  - `application/x-www-form-urlencoded`
- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器（XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问）。
- 请求中没有使用 ReadableStream 对象。

## 预检请求

如果请求不满足“简单请求”的条件，那么就需要先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。预检请求的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

预检请求会带上 `Access-Control-Request-Method`和`Access-Control-Request-Headers` 首部字段，前者表明请求方法，后者带有实际请求的自定义请求header。

预检请求的返回中可以包含 `xxx-Origin` `xxx-Methods` `xxx-Headers` `Access-Control-Max-Age`。Max-Age 表示该请求的有效期，在有效期内，浏览器无需为同一请求再次发起预检请求。

## 附带身份凭证的请求

可以基于 HTTP cookies 和 HTTP 认证信息发送身份凭证。

一般对于跨源请求，浏览器不会发送身份凭证信息。

如果要发送凭证信息，需要设置 XMLHttpRequest 的 `withCredentials` 标志为 true。

但如果服务端的响应中未携带 `Access-Control-Allow-Credentials: true`，浏览器将不会把响应内容返回给请求的发送者。

对于附带身份凭证的请求，服务器不得设置 `Access-Control-Allow-Origin` 为 '*'。

## HTTP 响应首部字段

- Access-Control-Allow-Origin
- Access-Control-Allow-Methods：young与预检请求的响应，指明实际请求允许使用的 HTTP 方法。
- Access-Control-Allow-Headers：用于预检请求的响应，指定实际请求中允许携带的 headers
- Access-Control-Allow-Credentials
- Access-Control-Expose-Headers：在跨源请求中，XMLHttpRequest 对象的 getResponseHeader() 方法只能拿到一些最基本的响应头（Cache-Control、Content-Length、Content-Type、Expires、Last-Modified、Pragma），如果要访问其他头，需要服务器设置本响应头。
- Access-Control-Max-Age：该请求多少秒内不需要发送预检请求

## HTTP 请求首部字段

发请求时自动设置，不需要手动设置。

- Origin：表明预检请求或实际请求的源。不含任何路径信息，只是服务器名称。在所有访问控制请求中，Origin 首部字段总是被发送。
- Access-Control-Request-Method
- Access-Control-Request-Headers
