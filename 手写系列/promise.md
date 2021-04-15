# Promise

> Promise A+ 规范： https://promisesaplus.com/
>
> Promise A+ 测试工具：https://github.com/promises-aplus/promises-tests

*以下英文注释都是 Promise A+ 中的规范内容。*

## Promise 的状态

```js
const PENDING = 'pending'
const FULFULLED = 'fulfilled'
const REJECTED = 'rejected'
```

## Promise 构造函数

```js
class Promise {
  status = PENDING
  value
  reason

  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  constructor(resolver) {
    // 必须传入一个函数作为参数
    if (typeof resolver !== 'function') {
      throw new TypeError(`Promise resolver ${resolver} is not a function`)
    }

    const resolve = (value) => {
      // 只有在 pending 状态时才允许改变状态
      if (this.status === PENDING) {
        this.status = FULFULLED
        this.value = value

        // 同一个 promise 上可以调多次 then（注：链式调用不是同一个 promise）
        this.onFulfilledCallbacks.forEach(cb => {
          cb()
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason

        this.onRejectedCallbacks.forEach(cb => {
          cb()
        })
      }
    }

    try {
      resolver(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
}
```

## then

```js
Promise.prototype.then = function(onFulfilled, onRejected) {
  // 2.2.1 Both onFulfilled and onRejected are optional arguments:
  const promise2 = new Promise((resolve, reject) => {
    const asyncFulfilledFn = () => {
      setTimeout(() => {
        try {
          // 2.2.1.1 If onFulfilled is not a function, it must be ignored.
          // 2.2.7.3 If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
          if (typeof onFulfilled !== 'function') {
            return resolve(this.value)
          }

          // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
          const x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
          reject(e)
        }
      }, 0)
    }

    const asyncRejectedFn = () => {
      setTimeout(() => {
        try {
          // 2.2.1.2 If onRejected is not a function, it must be ignored.
          // 2.2.7.4 If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
          if (typeof onRejected !== 'function') {
            return reject(this.reason)
          }

          const x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    }

    if (this.state === FULFULLED) {
      // 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
      // 也就是必须异步执行，这里使用 setTimeout 模拟
      asyncFulfilledFn()
    }

    if (this.state === REJECTED) {
      asyncRejectedFn()
    }

    // 2.2.6 then may be called multiple times on the same promise.
    //    If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.
    //    If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.
    if (this.state === PENDING) {
      this.onFulfilledCallbacks.push(asyncFulfilledFn)
      this.onRejectedCallbacks.push(asyncRejectedFn)
    }
  })

  // 2.2.7 then must return a promise [3.3].
  return promise2
}
```

## Promise 的解决过程

```js
/**
 * The Promise Resolution Procedure
 * Promise 解决过程，也就是获取 promise 结果的过程
 */
function resolvePromise(promise, x, resolve, reject) {
  // 2.3.1 -If promise and x refer to the same object, reject promise with a TypeError as the reason.
  // 避免死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the returned value should not be the same'))
  }

  // 2.3.1 If x is a promise, adopt its state [3.4]:
  // - 2.3.2.1 If x is pending, promise must remain pending until x is fulfilled or rejected.
  // - 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value.
  // - 2.3.2.3 If/when x is rejected, reject promise with the same reason.
  // 说白了就是调用 then
  if (x instanceof Promise) {
    // 如果 value 是个 promise，还要继续处理
    x.then(y => {resolvePromise(promise, y, resolve, reject)}, reject)
  } 
  // 2.3.3 Otherwise, if x is an object or function,
  else if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 2.3.3.1 Let then be x.then. [3.5]
    // 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
    // 尝试读取 x.then，读取失败则抛出错误
    // （这样做的原因是x.then可能被多次调用，作为属性有被篡改的可能性，因此提取出来，再通过 call 绑定 this 的方式确保多次调用都是同一个 then）
    let then
    try {
      then = x.then
    } catch (e) {
      return reject(e)
    }

    // 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
    if (typeof x.then === 'function') {
      // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
      let called = false
      try {
        then.call(x, (y) => {
          if (called) return
          called = true

          // 2.3.3.3.1 If/when resolvePromise is called with a value y, run [[Resolve]](promise, y)
          resolvePromise(x, y, resolve, reject)
        }, (e) => {
          if (called) return
          called = true

          // 2.3.3.3.2 If/when resolvePromise is called with a value y, run [[Resolve]](promise, y)
          return reject(e)
        })
      } catch (e) {
        // 2.3.3.3.4 If calling then throws an exception e,
        //   2.3.3.3.4.1 If resolvePromise or rejectPromise have been called, ignore it.
        // 2.3.3.3.4.2 Otherwise, reject promise with e as the reason.
        if (called) return
        return reject(e)
      }
    }

    // 2.3.3.4 If then is not a function, fulfill promise with x.
    else {
      return resolve(x)
    }
  }

  // 2.3.4 If x is not an object or function, fulfill promise with x.
  return resolve(x)
}
```

A+ 规范其实只规定了 Promise 的状态 states、then 方法、Promise 解决过程，其他如 catch/all 等方法并不在 A+ 规范内。其中 catch/finally 其实只不过是 then 的特定用例。

## catch

```js
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}
```

## finally

```js
// Promise 的 finally 并不是真的最终函数，只相当于一个特殊的 then：onFulfilled 和 onRejected 都调用一个函数，
// 且将原本的 value 或 reason 原封不动交给下一步去处理（除非函数调用抛出异常，则会用这个异常替代原来的 reason）
Promise.prototype.finally = function(fb) {
  const onFulfilled = (value) => {
    fn()
    return value
  }

  const onRejected = (reason) => {
    fn()
    throw reason
  }

  return this.then(onFulfilled, onRejected)
}
```

## Promise.resolve

```js
Promise.resolve = function(x) {
  if (x instanceof Promise) {
    return x
  }

  return new Promise(resolve => {
    resolve(x)
  })
}
```

## Promise.reject

```js
// Promise.reject 不区分参数是否 Promise
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
```

## Promise.race

```js
// 只返回第一个成功的值，或第一个失败的原因
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve()
    }

    promises.forEach((promise) => {
      Promise.resolve(promise).then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    })
  })
}
```

## Promise.all

```js
// 当且仅当所有的都成功，Promise.all 才算成功；任意一个 reject 都会导致 Promise.all reject；结果数组是有顺序的
// 不需要提前对参数做类型判断，交给内部的 promise 捕获错误进行 reject
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    const results = []
    const length = promises.length
    let count = 0

    if (length === 0) {
      return resolve(results)
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        count++
        results[index] = value
        
        if (count === length) {
          resolve(results)
        }
      }, reason => {
        reject(reason)
      })
    })
  })
}
```

## Promise.allSettled

```js
// 始终 resolve，会等待所有的 promise 完成；返回结果元素是带状态和结果的对象，这和 all 也是不一样的。
Promise.allSettled = function(promise) {
  return new Promise(function(resolve, reject) {
    const results = []
    const length = promises.length
    let count = 0

    if (length === 0) {
      return resolve(results)
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        count++
        results[index] = {
          status: FULFULLED,
          value,
        }

        if (count === length) {
          resolve(results)
        }
      }, reason => {
        count++
        results[index] = {
          status: REJECTED,
          reason,
        }

        if (count === length) {
          resolve(results)
        }
      })
    })
  })
}
```