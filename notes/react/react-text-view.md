# React - 构建一个简单的组件

### 编写组件

在 `app/components` 文件夹下创建 `text-view.jsx` 文件：

```javascript
import React from 'react';

class TextView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
    }

    render() {
        return (
            <div>{this.state.content}</div>
        );
    }
}

export default TextView;
```

组件继承于 `React.Component` ，React 从 `node_modules` 从引用。  

这个组件覆写了两个方法 `constructor(props)` 和 `render()`，前者顾名思义是这个组件的构造方法，后者是一个返回代表该组件的 DOM 结构。  

构造方法接受 `props` 作为参数，`props` 是外部调用该组件时传给该组件的参数对象，我们将该对象中的 `content` 字段赋值给该组件的 `state` 对象中相应的 `content` 字段。  

一般可以把 `props` 理解为该组件的初始化值，一般是不可变的，而 `state` 则是该组件在运行时的属性，一般是可变的。

最后使用 `export default TextView` 将该组件导出供外界使用（ES6 语法）。



### 使用组件

在 `index.js` 中导入该组件：

```
import TextView from './components/text-view.jsx'
```

使用 `ReactDOM` 将组件渲染到容器中：

```javascript
ReactDOM.render(<TextView content="This is a TextView"/>, document.getElementById('content'));
```





以上就是简单构建并使用一个 React 组件的过程。