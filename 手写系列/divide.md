# divide

整数除法。不使用 除法、乘法、mod 运算的除法实现。

最本质的思路就是：被除数可以由多少个除数相加得到。

```js
function divide(dividend, divisor) {
  if (divisor === 0) return Infinity
  if (divisor === 1) return dividend
  if (dividend < divisor) return 0

  let n = 0

  while(dividend >= divisor) {
    n++

    dividend -= divisor
  }

  return n
}
```

优化版，减少循环次数（降低时间复杂度）：

```js
// 参考：https://leetcode-cn.com/problems/divide-two-integers/solution/po-su-de-xiang-fa-mei-you-wei-yun-suan-mei-you-yi-/
function divide(dividend, divisor) {
  if (divisor === 0) return Infinity
  if (divisor === 1) return dividend
  if (dividend < divisor) return 0
  
  let n = 1
  let doublePrev = divisor
  let double = doublePrev + doublePrev

  while(dividend >= double) {
    doublePrev = double
    double += double
    n += n
  }

  return n + divide(dividend - doublePrev, divisor)
}
```

