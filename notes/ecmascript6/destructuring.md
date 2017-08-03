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

对象也可以解构赋值，但是变量名必须与属性同名（无需考虑位置），才能取得正确的值。

```javascript
let {joan, nedd} = {joan: "snow", nedd: "stark"};
//joan = "snow";
//nedd = "stark";

let {nedd, joan} = {joan: "snow", nedd: "stark"};
//joan = "snow";
//nedd = "stark";
```

如果变量名与属性名不一致，必须声明变量名与属性名的对应关系：

```javascript
let {bastard: name} = {bastard: "joan snow"};
//name = "joan snow";
```

由此可见，对象的解构赋值其实是找到同名属性，然后将该属性的值付给相同属性的变量，所以一下两个语句是一样的：

```javascript
let {name} = {name: "joan snow"};
let {name: name} = {name: "joan snow"};
```



## 字符串的解构赋值

字符串的解构赋值，其实就是把字符串当做一个数组来处理：

```javascript
let [a, b, c, d] = "joan";
//a = "j"
//b = "o"
//c = "a"
//d = "n"

//同时字符串对象还有一个 length 属性也可以取得
let {length} = "joan";
//length = 4
```



## 解构赋值的应用

* 快速交换变量的值

```javascript
[x, y] = [y, x];
```

* 函数可以有多个返回值

```javascript
function multiReturnValue() {
    return [1, 2, 3];
}

let [a, b, c] = multiReturnValue();


function multiReturnValue() {
    return {
        name: 'joan snow',
        family: 'stark'
    }
}

let {name, family} = multiReturnValue();
```

* 提取JSON对象的数据

```javascript
let jsonData = {
    name: 'joan snow',
    family: "stark",
    alias: "the king in the north"
};
let { name, family, alias } = jsonData;
```

* 快速获得函数中的方法

```javascript
//获得Math对象中的sin，cos和tan方法
let {sin, cos, tan} = Math;
```



*部分内容参考自[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)*。