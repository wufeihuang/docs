# listToTree

```js
interface IListItem {
  value: any
  id: number
  parent?: number
}


function listToTree(list) {
  const roots = []
  const left = []

  const map = arrayToMap(list, 'id')

  list.forEach(item => {
    if (!item.parent && item.parent !== 0) {
      roots.push(item)
    } else {
      if (map.has(item.parent)) {
        const parent = map.get(item.parent)
        parent.children = parent.children ? [...parent.children, item] : [item]
      } else {
        left.push(item)
      }
    }
  })

  return roots.concat(left)
}

```