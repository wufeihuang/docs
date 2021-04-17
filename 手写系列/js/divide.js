/**
 * 不使用乘法、除法和mod方法实现除法运算
 * 
 * 也就是检查被除数可以由多少个除数相加可得。
 * 
 * 不考虑小数。暂且忽略符号。
 */

// 最基础的思路
function divideBase(dividend, divisor) {
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

// 优化版，参考：https://leetcode-cn.com/problems/divide-two-integers/solution/po-su-de-xiang-fa-mei-you-wei-yun-suan-mei-you-yi-/
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