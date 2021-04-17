# instanceof

**原理**：检查右侧函数（类）的原型是否在左侧对象的原型链上。

> 如果右侧类具有 `[Symbol.hasInstance]()` 静态方法，那么会直接调用这个方法。
>
> 内建类（应该）都具备这个静态方法；类/函数在创建时也会自动拥有这个方法，但不可配置不可枚举不可修改，因此只有在 class 中使用 static 的方式才有自定义这个方法的机会。

*以下实现使用了辅助函数 [isPrimitive](手写系列/is-primitive)。*

**实现1**：基于 while 循环。

```js
function instanceof2(left, right) {
  // 右侧必须是函数
  if (typeof right !== 'function') {
    throw new TypeError('The right side must be a function')
  }

  // 如果左侧不是对象，直接返回 false
  if (isPrimitive(left)) {
    return false
  }

  let leftProto = Object.getPrototypeOf(left) // left.__proto__
  const rightProto = right.prototype

  // 遍历左侧对象的原型链，与右侧函数的原型进行比较
  while(leftProto) {
    if (leftProto === rightProto) {
      return true
    }

    leftProto = Object.getPrototypeof(leftProto)
  }

  return false
}
```

**实现2**：基于 obj.isPrototypeOf。

```js
function instanceof2(left, right) {
  return right.prototype.isPrototypeOf(left)
}
```

**实现3**：一个包含各种校验的实现（只具有演示意义，展示 instanceof 的判断顺序）。

```js
function instanceof2(obj, Class) {
  // 以下校验顺序是根据在Chrome中测试出来的（前两个校验在JS内部肯定不是如此判断，否则只需要判断右侧是否函数，这里有某些信息不清楚）
  
  
	// 先检测右边是否是对象（或函数）  
  if (isPrimitive(Class)) {
    throw new TypeError("Right-hand side of 'instanceof' is not an object")
  }
  
  // 检测右边是否可调用
  if (typeof Class !== 'function') {
    throw new TypeError("Right-hand side of 'instanceof' is not callable")
  }
  
  // 调用类上的 Symbol.hasInstance 方法
  // 但实际上类和函数在创建时就自带内置的 Symbol.hasInstance 静态方法
  // 为了避免调用内置的方法（否则这自定义实现又实际上绕到了内部实现去了），需要再判断一下是自定义的方法才调用
  if (Class[Symbol.hasInstance]) {
    if (Class[Symbol.hasInstance] !== Object[Symbol.hasInstance]) {
      return !!Class[Symbol.hasInstance](obj)
    }
  }
  
  // 如果左侧是原始类型，那么直接返回 false
  if (isPrimitive(ob)) {
    return false
  }
  
  let proto = Object.getPrototypeOf(obj)
  
  const ClassPrototype = Class.prototype
  
  // 检测右侧对象的原型是否一个对象
  if (isPrimitive(ClassPrototype)) {
    throw new Error(`Function has non-object prototype '${ClassPrototype}' in instanceof check`)
  }
  
  // 将右侧对象的原型与左侧对象原型链上的对象一一比较，匹配到了则返回 true，否则返回 false
  while(proto) {
    if (proto === ClassPrototype) {
      return true
    }
    
    proto = Object.getPrototypeOf(proto)
  }
  return false
  
  // 上面的 while 循环部分可以用以下方式替换，但这还要考虑 ClassPrototype 上 isPrototypeOf 方法是否存在或者被修改...还是用 while 循环好了
  // return ClassPrototype.isPrototypeOf(proto)
}
```