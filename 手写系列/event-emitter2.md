# EventEmitter 增强版

对 [EventEmitter](手写系列/event-emitter) 进行了增强，支持事件修饰符，即支持在触发 {event} 事件时，同时能触发以 {event}.{subname} 格式命名的子事件。这在很多地方监听统同一个事件（比如页面滚动），而部分事件监听在某些情况下需要移除时十分有用（准确来说，更适用于需要批量移除同一事件下部分事件监听的场景，否则单个事件监听的移除是可以不需要修饰符的）。

*好像是 jQuery 有这样的能力，但 eventemittre3 之类的库不具备。*

```js
// 事件层级的分隔符，event/event.a
const divider = '.' // * 扩展，定义分隔符

function EE(event, fn, context, once) {
  this.event = event // * 扩展，增加事件名记录，方便进行清理
  this.fn = fn
  this.context = context
  this.once = once || false
}

function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function')
  }

  const listener = new EE(event, fn, context, once) // *

  if (!emitter._events[event]) {
    emitter._events[event] = [listener]
  } else {
    emitter._events[event].push(listener)
  }

  return emitter
}

function clearEvent(emitter, event) {
  // delete emitter._events[event]
  // * 扩展：同时移除 {event} 和以 {event}. 开头的事件
  Object.keys(emitter._events).forEach(eventName => { 
    if (eventName === event || eventName.startsWith(event + divider)) {
      delete emitter._events[eventName]
    }
  })
}

class EventEmitter {
  _events = {}

  // 添加监听器
  addListener(event, fn, context) {
    return addListener(this, event, fn, context, false)
  }

  // 添加只执行一次的监听器
  once(event, fn, context) {
    return addListener(this, event, fn, context, true)
  }

  // 移除事件或特定监听器
  removeListener(event, fn, context, once) {
    if (!this._events[event]) return this

    if (!fn) {
      clearEvent(this, event)
      return this
    }

    const listeners = this._events[event]
    let events = []
    listeners.forEach(listener => {
      if (listener.fn !== fn || (once && !listener.once) || (context && !listener.context)) {
        events.push(listener)
      }
    })

    if (events.length) {
      this._events[event] = events
    } else {
      delete this._events[event]
    }

    return this
  }

  // 移除所有监听器，或某个事件
  removeAllListeners(event) {
    if (event) {
      if (this._events[event]) {
        clearEvent(this, event)
      }
    } else {
      this._events = {}
    }

    return this
  }

  // 触发事件
  emit(event, ...args) {
    // if (!this._events[event]) return false

    // * 扩展：同时触发 {event} 和 以 {event}. 开头的事件
    let listeners = []
    Object.keys(this._events).forEach(eventName => {
      if (event === eventName || eventName.startsWith(event + divider)) {
        listeners = listeners.concat(this._events[eventName])
      }
    })

    if(!listeners.length) return false


    listeners.forEach(listener => {
      if (listener.once) {
        this.removeListener(listener.event, listener.fn, undefined, true)
      }

      listener.fn.apply(listener.context, args)
    })

    return true
  }
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener
EventEmitter.prototype.off = EventEmitter.prototype.removeListener
EventEmitter.prototype.trigger = EventEmitter.prototype.emit
```