# 判断数字 n 是否为素数（质数）。

```js
function isPrime(n) {
  if (n === 1) return false

  if (n === 2) return true

  if (n % 2 === 0) return false

  const sqrt = Math.sqrt(n)
  const sqrtCeil = Math.ceil(sqrt)

  if (sqrt === sqrtCeil) return false

  for (let i = 3; i < sqrtCeil; i += 2) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}
```

优化思路：大于n平方根的数，只有乘以小于n平方根的数相乘才可能等于n，因此只需要检查小于n平方根的部分就够了。