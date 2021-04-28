class Stack {
  constructor() {
    this.items = []
  }

  /**
   * 添加一个（或多个）新元素到栈顶
   */
  push(...args) {
    this.items.push(...args)
  }

  /**
   * 移除栈顶的元素，同时返回被移除的元素
   */
  pop() {
    return this.items.pop()
  }

  /**
   * 返回栈顶的元素，不做修改
   */
  peek() {
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return !!this.items.length
  }

  clear() {
    this.items = []
  }

  size() {
    return this.items.length
  }
}