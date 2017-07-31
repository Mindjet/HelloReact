# 解构赋值

解构（Destructuring）赋值指的是：按照一定的模式，从数组或者对象中提取出数值来对变量进行赋值。

```javascript
let a = 1;
let b = 2;

//等同于
[a, b] = [1, 2];
```

实际上，只要等号左右两边的模式（嵌套）相同，左边的变量就会赋值为右边对应的数值。



## 数组的解构赋值

### 完全解构

完全解构情况下，**左右两边的模式完整匹配**。

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"
```

### 不完全解构

不完全解构情况下，**等号左边的模式只匹配右边一部分的模式**。

```javascript
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

不完全解构的情况下，所有变量都可以被成功赋值。

### 解构失败

解构失败的原因是：**等号右边的模式只匹配等号左边一部分的模式（或完全不能匹配）**。

```javascript
var [foo] = [];
var [bar, foo] = [1];
```

解构失败的情况下，变量的值为 `undefined`。

### 默认值

解构时可以为变量赋默认值，但只有变量结构后为 `undefined` 时才会使用默认值。

```javascript
let [x = 2] = [1]; //x = 1
let [x = 2] = []; //x = 2
let [x = 2] = [null]; //x = null
let [x = 2] = [undefined]; //x = 2
```

另外，当默认值是一个函数时，该函数只有当变量解构后为 `undefined` 时才会调用（惰性）。

```javascript
function defaultValue(){
  console.log('defaultValue');
  return 0;
}

let [x = defaultValue()] = [1];	//defaultValue函数不会被调用
```



## 对象的解构赋值



