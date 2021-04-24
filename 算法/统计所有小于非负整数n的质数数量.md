# 统计所有小于非负整数n的质数的数量

1. 完全遍历

isPrime 质数判断本身是通过遍历实现的，因此整体时间复杂度高。O(n<sup>2</sup>)

```js
function countPrimes(n) {
  if(n < 2) return 0

  let count = 1
  for (let i = 3; i <= n; i++) {
    if (isPrime(i)) {
      console.log(i)
      count++
    }
  }
  return count
}
```

2. 厄拉多塞筛法

找到一个质数后，将它的倍数都标记起来，遍历到的时候忽略掉，这样就不需要进行质数的判断。

```js
function countPrimes(n) {
  if (n < 2) return 0


  let count = 0
  const signs = []
  
  for(let i = 2; i < n; i++) {
    if (!signs[i]) {
      count++

      for (let j = i + i; j < n; j += i) {
        signs[j] = true
      }
    }
  }

  return count
}
```

