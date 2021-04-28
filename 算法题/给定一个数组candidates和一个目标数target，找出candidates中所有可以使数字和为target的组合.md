
题目：

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。


candidates 中的每个数字在每个组合中只能使用一次。


测试demo:

candidates = [10,1,2,7,6,1,5], target = 8,


结果：

[

  [1, 7],

  [1, 2, 5],

  [2, 6],

  [1, 1, 6]

]

```js
function findPairs(candidates, target) {
    let filtered = candidates.filter(d => d <= target)
    filtered.sort((a, b) => a - b)
    
    const l = filtered.length
    const max = filtered[l - 1]
    
    const uniqueMap = {}
    const result = []
    
    for (let i = 0; i < l; i++) {
        const value = filtered[i]
        const diff = target - value
        
        if (diff > max) break
        
        if (diff && i === l - 1) break
        
        if (diff === 0) {
            if (!uniqueMap[value]) {
                result.push([value])
                uniqueMap[value] = true
            }
        } else {
            const others = findPairs(filtered.slice(i+1), diff)
            
            for (let j = 0; j < others.length; j++) {
                const other = others[j]
                const item = [value, ...other]
                const str = item.join('')
                if (!uniqueMap[str]) {
                    result.push(item)
                    uniqueMap[str] = true
                }
                
            }
        }
    }
    
    return result
}
```
