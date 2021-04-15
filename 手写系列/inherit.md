# 基于原型的继承 inherit

参照 ES6 class 的特点，一个合格的继承需要以下特点：

- 实例功能：父类构造函数实现的功能，能在且需要在子类上同样实现；
- 原型：父类原型上的属性和方法，子类也要可以访问；
- 重载：子类上可以覆盖父类的属性和方法；
- 无冗余：父类构造函数只调用一次；
- 传参：子类构造函数可以接受参数，并可以向父类构造函数传递参数；
- 静态属性：子类可以继承父类的静态属性和方法。

网上有如构造函数继承、原型链继承、组合继承、寄生继承、拷贝继承等各种名字的 n 种实现方式，其实都是半成品，忽略不提。

```js
function inheritProto(Child, Parent) {
  // 基于 Parent 原型对象创建一个新对象
  const o = Object.create(Parent.prototype)

  // 构造函数虽然不常用，但应当和 new Constructor() 的效果保持一致性；在采用后面第二种方式时，这一段可以不要
  // o.constructor = Child

  // 原型继承 ，Child.prototype.__proto__ === o.__proto__ === Parent.prototype
  // 这种方式直接覆盖掉 Child 的原型；如果使用拷贝原型的方式，容易丢掉原型上很多能力，比如不可枚举的属性
  // Child.prototype = o

  // 如果要将 Child 上原来的原型属性和方法保留，可以这么实现
  const oldChildProto = Child.prototype
  Child.prototype = o
  // 注意：Object.assign 只拷贝可枚举属性
  Object.assign(Child.prototype, oldChildProto)
}

// 另一种使用 Object.setPrototypeOf 的方式
// function inheritProto(Child, Parent) {
//   // 这种直接修改原型的方式性能较差，不太推荐。 [Object\.setPrototypeOf\(\) \- JavaScript \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
//   Object.setPrototypeOf(Child.prototype, Parent.prototype)
// }

function Parent(){
  this.name = 'parent'
}

Parent.prototype.eat = function(){
  console.log(`${this.name} is eating.`)
}

Parent.play = function(){
  // 这是静态方法，这里的 this 不是实例
  console.log(`${this.name} is playing.`)
}

function Child(...args) {
  // 这里实际上可以自由传参，类似类中的 super()
  Parent.call(this, ...args)

  this.name = 'child'
  this.age = 18
}

Child.prototype.say = function() {
  console.log(`I am ${this.age} years old.`)
}

// 继承原型
inheritProto(Child, Parent)

// 继承静态静态属性与方法
Object.setPrototypeOf(Child, Parent)
```