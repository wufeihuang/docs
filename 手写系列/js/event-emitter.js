// 参考：https://github.com/primus/eventemitter3/blob/master/index.js
// eventemitter3 中有很多出于性能等方面考虑而做的优化，此处做了简化

function EE(fn, context, once) {
  this.fn = fn
  this.context = context
  this.once = once || false
}

function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function')
  }

  const listener = new EE(fn, context, once)

  if (!emitter._events[event]) {
    emitter._events[event] = [listener]
  } else {
    emitter._events[event].push(listener)
  }

  return emitter
}

function clearEvent(emitter, event) {
  delete emitter._events[event]
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
    if (!this._events[event]) return false

    const listeners = this._events[event]

    listeners.forEach(listener => {
      if (listener.once) {
        this.removeListener(event, listener.fn, undefined, true)
      }

      listener.fn.apply(listener.context, args)
    })

    return true
  }
}


EventEmitter.prototype.on = EventEmitter.prototype.addListener
EventEmitter.prototype.off = EventEmitter.prototype.removeListener
EventEmitter.prototype.trigger = EventEmitter.prototype.emit
