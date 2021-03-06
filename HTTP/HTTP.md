# HTTP

> [HTTP \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

超文本传输协议（HyperText Transfer Protocol），是一个用于传输超媒体文档（如 HTML）的应用层协议。

是为 Web 浏览器与 Web 服务器之间的通信而设计的，但也可用于其他目的。

HTTP 遵循经典的 客服端-服务端模型，客户端打开一个连接以发出请求，然后等待直到收到服务器端相应。

HTTP 是无状态协议，这意味着服务器不会在两个请求之间保留任何数据（状态）。

通常基于 TCP/IP 层，但可以在任何可靠的传输层上使用。

## HTTP 概述

> [HTTP概述 \- HTTP \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)

### 基于 HTTP 的组件系统

- 客户端（user-agent）
- Web 服务端
- 代理（Proxies），会有其他计算机或设备转发 HTTP 消息，主要有以下作用：
  - 缓存（包括浏览器的缓存）
  - 过滤（如发病毒扫描、家长控制）
  - 负载均衡（让多个服务器服务不同请求）
  - 认证（对不同资源进行权限管理）
  - 日志记录（允许存储历史信息）

### HTTP 的基本性质

- HTTP 是简单点
- HTTP 是可扩展的

基于 HTTP headers 使协议很容易扩展，只要服务端和客户端对新的 headers 语义达成一致，就能添加新功能。

- HTTP 是无状态的，有会话的

无状态：在同一个链接中，两个执行成功的请求之间是没有关系的。

有会话：HTTP 本身是无状态（stateless）的，而使用 cookies 可以创建有状态的会话（stateful sessions）。（浏览器会自动会在每次请求的 headers 中携带 cookie，从而使得 HTTP 请求之间可以共享相同的状态。）

- HTTP 和连接

一个连接是由传输层来控制的，这从根本上不属于 HTTP 的范围。

HTTP 并不需要其底层的传输协议是面向连接的，只需要它是可靠的，或不丢失消息的（至少返回错误）。通常 HTTP 依赖于面向连接的 TCP 进行消息传递，但连接并不是必须的。

在客户端（浏览器）与服务器能够交互之前，必须在两者间建立一个 TCP 连接，打开一个 TCP 连接需要多次往返交换消息（因此耗时）。

HTTP/1.0 默认为每一对 HTTP 请求/响应都打开一个单独的 TCP 连接。

HTTP/1.1 引入了流水线（pipelining 被证明难以实现）和持久连接（persistent connections）的概念：底层的 TCP 连接可以通过控制 Connection 头部来杯部分控制。

HTTP/2 通过在一个连接复用消息的方式来让这个连接始终保持不被断开。

前面有提到，HTTP 只要求传输是可靠的，不一定非要依赖 TCP —— Google 研发了一种以 UDP 为基础，能提供更可靠更高效的传输协议 QUIC。

### HTTP 能控制什么

- 缓存：服务端能告诉代理和客户端哪些文档需要被缓存，缓存多久；客户端也能命令中间的缓存代理来忽略存储的文档。
- 开放同源限制：HTTP 可以通过修改相关头部开放同源限制。
- 认证：一些页面能够被保护起来，仅让特定的用户进行访问。
- 代理和隧道
- 会话：使用 HTTP Cookies 允许使用一个服务端的状态发起请求，这就创建了会话。

### HTTP 流

打开一个 TCP 连接（新开或复用）-> 发送一个 HTTP 报文 -> 读取服务端返回的报文信息 -> 关闭连接或为后续请求重用连接。

当HTTP流水线启动时，后续请求都可以不用等待第一个请求的成功响应就被发送。但现有网络中有很多新老软件共存，导致 HTTP 流水线难以实现。因此 HTTP 流水线已被更稳健的 HTTP/2 的帧所取代。

### HTTP 报文

HTTP/1.1 及之前 HTTP 协议报文都是语义可读的。

在 HTTP/2 中，这些报文被嵌入到新的二进制结构，帧。帧允许实现很多优化，比如报文头部的压缩和复用。帧虽然使得报文不可读，但原理仍是相同的。

请求：

- 请求行：方法 资源路径（不含协议域名端口） HTTP 协议版本号 （GET / HTTP/1.1）
- 请求头
- 空行
- 请求体

响应：

- 响应行：协议版本号 状态码 状态信息（HTTP/1.1 200 OK）
- 响应头
- 空行
- 响应体

#### 基于 HTTP 的 APIs

- XMLHttpRequest
- Fetch
- [EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)：服务器发送的事件，允许服务器使用 HTTP 作为传输机制向客户端发送事件。是一种单向服务。

