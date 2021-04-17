 // 注：js 超过21位的数字（10进制）会被自动转成科学计数法；最大安全数字是 Number.MAX_SAFE_INTEGER，即 2**53，16位10进制长度。

class BigInt2 {
  constructor(value) {
    // 这里忽略了校验，value 应该是整数的字符串，允许带符号
    const sign = value[0]

    if (sign === '-') {
      this.value = value
      this.sign = '-'
    } else if (sign === '+') {
      this.value = value.slice(1)
      this.sign = '+'
    } else {
      this.value = value
      this.sign = '+'
    }
  }

  toString() {
    return this.value
  }

  static isBigInt(x) {
    return x instanceof BigInt2
  }

  static isNegative(x) {
    return x.sign === '-'
  }

  // 取反
  static negate(x) {
    return new BigInt2(BigInt2._negate(x.value))
  }

  static add(x, y) {
    if (!BigInt2.isBigInt(x) || !BigInt2.isBigInt(y)) {
      throw new TypeError('参与计算的两个值都必须是 BigInt')
    }

    const signs = BigInt2._compareSign(x, y)

    let value = ''
    if (signs === '++') {
      value = BigInt2._nosignAdd(x.value, y.value)
    } else if (signs === '--') {
      value = BigInt2._nosignAdd(x.value.slice(1), y.value.slice(1))
      value = '-' + value
    } else if (signs === '+-') {
      value = BigInt2._nosignSubtract(x.value, y.value.slice(1))
    } else if(signs === '-+') {
      value = BigInt2._nosignSubtract(y.value, x.value.slice(1))
    }
  
    return new BigInt2(value)
  }

  static subtract(x, y) {
    const negatedY = BigInt2.negate(y)
    return BigInt2.add(x, negatedY)
  }

  static multiply(x, y) {
    let sign = ''

    const signs = BigInt2._compareSign(x, y)
    if (signs === '+-' || signs === '-+') {
      sign = '-'
    }

    const nosignXValue = x.value[0] === '-' ? x.value.slice(1) : x.value
    const nosignYValue = y.value[0] === '-' ? y.value.slice(1) : y.value
    const value = BigInt2._nosignMultiply(nosignXValue, nosignYValue)

    return new BigInt2(sign + value)
  }

  static divide(x, y) {
    let sign = ''

    const signs = BigInt2._compareSign(x, y)
    if (signs === '+-' || signs === '-+') {
      sign = '-'
    }

    const nosignXValue = x.value[0] === '-' ? x.value.slice(1) : x.value
    const nosignYValue = y.value[0] === '-' ? y.value.slice(1) : y.value

    const value = BigInt2._nosignDivide(nosignXValue, nosignYValue)

    return new BigInt2(sign + value)
  }

  static mod(x, y) {
    let sign = ''

    const signs = BigInt2._compareSign(x, y)
    if (signs === '+-' || signs === '-+') {
      sign = '-'
    }

    const nosignXValue = x.value[0] === '-' ? x.value.slice(1) : x.value
    const nosignYValue = y.value[0] === '-' ? y.value.slice(1) : y.value

    const value = BigInt2._nosignMod(nosignXValue, nosignYValue)

    return new BigInt2(sign + value)
  }

  // 大小比较，1: x > y，0：x = y，-1：x < y
  static compare(x, y) {
    const isNegativeX = BigInt2.isNegative(x)
    const isNegativeY = BigInt2.isNegative(y)

    // 先比较符号
    if (isNegativeX && !isNegativeY) {
      return -1
    }

    if (!isNegativeX && isNegativeY) {
      return 1
    }

    const xValue = x.value
    const yValue= y.value

    // 利用字符串的大小比较
    if (isNegativeX) {
      return -(BigInt2._nosignCompare(xValue, yValue))
    } else {
      return BigInt2._nosignCompare(xValue, yValue)
    }
  }

  static _nosignCompare(valueX, valueY) {
    const xLength = valueX.length
    const yLength = valueY.length

    if (xLength > yLength) {
      return 1
    } else if (xLength < yLength) {
      return -1
    } else {
      // 长度相等时可以利用字符串的比较
      return valueX > valueY ? 1 : (valueX === valueY ? 0 : -1)
    }
  }

  // 参数为整数字符串
  static _nosignAdd(valueX, valueY) {
    const xLength = valueX.length
    const yLength = valueY.length

    let maxLength, minLength, bigValue, smallValue
    if(xLength > yLength) {
      maxLength = xLength
      minLength = yLength
      bigValue = valueX
      smallValue = valueY
    } else {
      maxLength = yLength
      minLength = xLength
      bigValue = valueY
      smallValue = valueX
    }

    const lengthDiff = maxLength - minLength

    let tenPlus = false // 10 进 1 判断
    let result = ''
    for (let i = maxLength - 1; i >= 0; i--) {
      const valueOfSmall = +smallValue[i - lengthDiff] || 0
      const valueOfBig = +bigValue[i] || 0
      const extra = tenPlus ? 1 : 0 // 上一轮 10 进 1
      let sum = valueOfSmall + valueOfBig + extra

      if (sum >= 10) {
        tenPlus = true
        result = String(sum)[1] + result
      } else {
        tenPlus = false
        result = String(sum) + result
      }
    }

    // 如果最后一轮计算还要进1
    if (tenPlus) {
      result = '1' + result
    }

    return result
  }

  static _nosignSubtract(valueX, valueY) {
    const xLength = valueX.length
    const yLength = valueY.length

    let sign = ''
    let maxLength, minLength, bigValue, smallValue

    if(BigInt2._nosignCompare(valueX, valueY) >= 0) {
      maxLength = xLength
      minLength = yLength
      bigValue = valueX
      smallValue = valueY
    } else {
      maxLength = yLength
      minLength = xLength
      bigValue = valueY
      smallValue = valueX

      sign = '-'
    }

    const lengthDiff = maxLength - minLength

    let tenMinus = false // 上一步不够减，要借1
    let result = ''
    for (let i = maxLength - 1; i >= 0; i--) {

      let valueOfBig = +bigValue[i] || 0
      const valueOfSmall = +smallValue[i - lengthDiff] || 0

      // 如果被上一位借了1，需要减去
      if (tenMinus) {
        valueOfBig -= 1
        tenMinus = false
      }

      // 不够大，向下一位借 1
      if (valueOfBig < valueOfSmall) {
        tenMinus = true
        valueOfBig = valueOfBig + 10
      }

      let diff = valueOfBig - valueOfSmall

      result = String(diff) + result
    }

    // 清理前面的0
    let startIndex = 0
    for(let i = 0; i < result.length; i++) {
      if (result[i] !== '0') {
        break
      }

      startIndex += 1
    }

    if (startIndex) {
      result = result.slice(startIndex)
    }

    return  sign + result
  }

  static _nosignMultiply(valueX, valueY) {
    if (valueX === '' || (/^0+$/).test(valueX)) {
      return '0'
    }

    if (valueY === '' || (/^0+$/).test(valueY)) {
      return '0'
    }

    const xLength = valueX.length
    const yLength = valueY.length

    // 两数相乘，长度可能为 (xLength + yLength) 或 (xLength + yLength - 1)
    const arrs = []

    // 从低位开始计算，
    // （如果从高位开始计算的话，高位计算完后，低位计算可能出现进位，又得修改高位）
    for (let i = xLength - 1; i >= 0; i--) {
      for (let j = yLength - 1; j >= 0; j--) {
        const index1 = i + j
        const index2 = index1 + 1

        // arrs[0] 是为两数最高相乘的进位预留的；所以 i * j 对应的位置需后移1位，为 i+j+1

        const mul = valueX[i] * valueY[j] + (arrs[index2] || 0)
        arrs[index1] = Math.floor(mul / 10) + (arrs[index1] || 0) // 向前进位；这一步相加后可能超过10，但会在下一次计算中被解决
        arrs[index2] = mul % 10 // 当前 i*j 应该对应的位置（个位）
      }
    }

    return arrs.join('').replace(/^0+/, '')
  }

  static _nosignDivide(dividend, divisor) {
    if (divisor === '0') {
      throw new Error('除数不能为0')
    }

    const compare = BigInt2._nosignCompare(dividend, divisor)
    if (compare === -1) return 0
    if (compare === 0) return 1
    
    let n = 1

    let doublePrev = divisor
    let double = BigInt2._nosignAdd(doublePrev, doublePrev)

    while(BigInt2._nosignCompare(dividend, double) >= 0) {
      doublePrev = double
      double = BigInt2._nosignAdd(double, double)
      n += n
    }

    return n + BigInt2._nosignDivide(BigInt2._nosignSubtract(dividend, doublePrev), divisor)
  }

  static _nosignMod(dividend, divisor) {
    if (divisor === '0') {
      throw new Error('除数不能为0')
    }

    const compare = BigInt2._nosignCompare(dividend, divisor)
    if (compare === -1) return dividend
    if (compare === 0) return '0'

    let mod = '0'

    let double = divisor

    while(BigInt2._nosignCompare(dividend, double) <= 0) {
      double = BigInt2._nosignMultiply(double, '2')
      mod = BigInt2._nosignSubtract(dividend, double)
    }

    if (BigInt2._nosignCompare(mod, divisor) <= 0) {
      return mod
    }

    return BigInt2._nosignMod(mod, divisor)
  }

  // 取反
  static _negate(value) {
    if (value[0] === '-') {
      return value.slice(1)
    } else {
      // 内部方法，不用考虑带 + 号
      return '-' + value
    }
  }

  static _compareSign(x, y) {
    let xSign = '+'
    let ySign = '+'

    if (BigInt2.isNegative(x)) {
      xSign = '-'
    }

    if (BigInt2.isNegative(y)) {
      ySign = '-'
    }

    return xSign + ySign
  }
}