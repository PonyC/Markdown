## 类型

7种：`Undefined`,` Null`,`Boolean`,`String`,`Number`,`Symbol`,`Object`

### Undefined、Null

`Undefined`：未赋值时变量的初始值

我们一般不会把变量赋值为 undefined，这样可以保证所有值为 undefined 的变量，都是从未赋值的自然状态。

```js
// Undefined 类型表示未定义，它的类型只有一个值，就是 undefined。任何变量在赋值前是 Undefined 类型、值为 undefined
// 因为 JavaScript 的代码 undefined 是一个变量，而并非是一个关键字，这是 JavaScript 语言公认的设计失误之一，所以，我们为了避免无意中被篡改，建议使用 void 0 来获取 undefined 值。

let a // 这时 a === undefined
```

`Null`：定义了但是为空

```js
// Null 类型也只有一个值，就是 null，它的语义表示空值，与 undefined 不同，null 是 JavaScript 关键字，所以在任何代码中，你都可以放心用 null 关键字来获取 null 值。
let a = null // 一般用于初始化赋值 
```

### Boolean

表示真假，这里需要注意一点：

```js
let a // undefined
let a = null 
let a = 0
// 以上3个值返的都是false
```

### String

- 最大长度`2^53 - 1`

- String 的意义并非“字符串”，而是字符串的 UTF16 编码，我们字符串的操作 charAt、charCodeAt、length 等方法针对的都是 UTF16 编码

  > Note：现行的字符集国际标准，字符是以 Unicode 的方式表示的，每一个 Unicode 的码点表示一个字符，理论上，Unicode 的范围是无限的。UTF 是 Unicode 的编码方式，规定了码点在计算机中的表示方法，常见的有 UTF16 和 UTF8。 Unicode 的码点通常用 U+??? 来表示，其中 ??? 是十六进制的码点值。 0-65536（U+0000 - U+FFFF）的码点被称为基本字符区域（BMP）。

### Number

为什么在 JavaScript 中，0.1 + 0.2 不能 = 0.3?

```js
// 这里输出的结果是 false，说明两边不相等的，这是浮点运算的特点，也是很多同学疑惑的来源，浮点数运算的精度问题导致等式左右的结果并不是严格相等，而是相差了个微小的值。
console.log( 0.1 + 0.2 == 0.3);
```

正确的比较方法是使用 JavaScript 提供的最小精度值：

```js
// 检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法。这段代码结果就是 true 了。
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
```

### Symbol

一些标准中提到的 Symbol，可以在全局的 Symbol 函数的属性中找到。例如，我们可以使用 Symbol.iterator 来自定义 for…of 在对象上的行为：

```js
    var o = new Object

    o[Symbol.iterator] = function() {
        var v = 0
        return {
            next: function() {
                return { value: v++, done: v > 10 }
            }
        }        
    };

    for(var v of o) 
        console.log(v); // 0 1 2 3 ... 9
```

### Object

- 我们必须认识到 3 与 new Number(3) 是完全不同的值，它们一个是 Number 类型， 一个是对象类型。
- Number、String 和 Boolean，三个构造器是两用的，当跟 new 搭配时，它们产生对象，当直接调用时，它们表示强制类型转换。
- Symbol 函数比较特殊，直接用 new 调用它会抛出错误，但它仍然是 Symbol 对象的构造器。
- JavaScript 语言设计上试图模糊对象和基本类型之间的关系，我们日常代码可以把对象的方法在基本类型上使用

#### StringToNumber

- 多数情况下，Number 是比 parseInt 和 parseFloat 更好的选择。

> 在不传入第二个参数的情况下，parseInt 只支持 16 进制前缀“0x”，而且会忽略非数字字符，也不支持科学计数法。在一些古老的浏览器环境中，parseInt 还支持 0 开头的数字作为 8 进制前缀，这是很多错误的来源。所以在任何环境下，都建议传入 parseInt 的第二个参数，而 parseFloat 则直接把原字符串作为十进制来解析，它不会引入任何的其他进制。

#### 装箱转换

每一类装箱对象皆有私有的 Class 属性，这些属性可以用 Object.prototype.toString 获取：

```js
var symbolObject = Object(Symbol("a"));
console.log(Object.prototype.toString.call(symbolObject)); //[object Symbol]
```

在 JavaScript 中，没有任何方法可以更改私有的 Class 属性，因此 `Object.prototype.toString` 是可以准确识别对象对应的基本类型的方法，它比 instanceof 更加准确。

