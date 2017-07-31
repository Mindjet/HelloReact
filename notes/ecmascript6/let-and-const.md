# let 和 const

## let

`let` 的用法与 `es5` 中的 `var` 类似，但是前者有作用域的限制，而后者仅作为一个全局变量使用。这意味着 `let` 声明的变量一旦脱离了其作用域，便会出错（ReferenceError）。

#### 作用域

```javascript
{
    let foo = 1;
  	foo	// 1
}

foo //ReferenceError
```

另外，在同一作用域内，不允许使用 `let` 对同一变量多次声明：

```javascript
//Error
{
  let a = 1;
  let a = 2;
}
```

#### let 与 var 区别

`let` 在 `for` 循环中很有用， 比如：

```javascript
//使用 let 作为计数器的情况下
var a = [];
for (let i = 0; i < 5; i++) {
  a[i] = () => console.log(i);
}
a[1]();		//会打印出 1

//使用 var 作为计数器的情况下
var a = [];
for (var i = 0; i < 5; i++) {
  a[i] = () => console.log(i);
}
a[1]();		//会打印出 5
```



## const

`const` 声明一个只读常量，在声明时就必须赋值，而且（严格模式下）不能重复赋值。`const` 声明的常量与 `let` 声明的变量一样受到作用域的限制。

需要注意的是，当 `const` 声明一个复合类型的变量时，变量名并不是指向数据，而是指向数据所在的地址。`const` 只能保证该地址不会改变，无法保证该地址的数据不变，如下例：

```javascript
const foo ={};
foo.gringe = 'gringe';
```

此外，如果想把一个对象完全冻结，即内存地址和数据均不可改变，可以采用以下的方法：

```javascript
let freeze = function (obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach(function (key, value) {
        if (typeof obj[key] === 'object') {
            freeze(obj[key]);
        }
    })
};
```

`Object.freeze(obj)` 方法相当于把该对象的字段都用了一遍 `const`，然后我们使用递归来解决多层嵌套的情况。



## 变量提升

`var` 的声明的变量可以在声明前使用，但 `let` 和 `const` 不可以，即 `var` 存在变量提升机制，而 `let` 和 `const` 不存在。

```javascript
console.log(a); //undefined
console.log(b); //ReferenceError
console.log(c); //ReferenceError

var a = 1;
let b = 2;
const c = 3;
```



*部分内容参考自[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)*。

