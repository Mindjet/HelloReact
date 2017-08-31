# React - 初尝

### jQuery or React？

`jQuery` 是对原生 `JavaScript` 封装使其更加易用，崇尚的是 `html`，`css` 和 `js` 独立的思想，而 `React` 主导的是将实现某一个功能的  `html`，`css` 和 `js` 绑定在一块，作为一个**组件（component）**来使用。个人认为，两者各有所长，专注点也不同。`jQuery` 应该更加适合工具库和逻辑业务的开发，即不涉及 `view` 层的开发，；而 `React` 更加适合页面业务的开发，可以将多个常用的功能模块设计为组件进行复用。



### JSX

既然说 `React` 是将 `html`，`css` 和 `js` 作为一个组件，那么这三者如何整合在一块？为此，Facebook 引入了 `JSX` 语法来实现。在 `JSX` 文件中，一般会出现 `html` 和 `js` 代码，而 `css` 代码一般通过外部引入的方式来加入到其中，如下所示：

```jsx
import React from 'react';
import 'text-view.css';

export default class TextView extends React.Component {
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
```



### 生命周期

`React` 的组件均有生命周期，`componentWillMount`，`componentDidMount`，`render` 等，即在组件不同的加载阶段会有不同的回调方法，开发者可以在这些方法中更好地对组件进行控制，比如在组件销毁时对资源进行释放等操作。



### 原理和效率

相比于 `jQuery` 直接操作 `DOM`，`React` 采用一种 `Virtual DOM` 的技术来间接操作 `DOM`。所谓的 `Virtual DOM` 技术，指的是开发者去改变 `“DOM”` 时并不会直接影响到真实的 `DOM`，最终的 `DOM` 是通过虚拟的 `DOM` 结构加上特定的算法得出来的。

`React` 对于事件机制做了优化，采用了事件委托，即 `React` 会对同一种事件进行汇总，然后计算出是哪个元素触发了该事件，再把事件分配到该元素上。比如 `onClick`，虽然在代码中可能有多个 DOM 绑定，但是最终其实只是绑定在同一个 `onClick` 上，`React` 会通过 `Virtual DOM` 计算出到底是哪个元素触发了这个事件。

最重要的是，`React` 对于 `DOM` 的更新有一个比较突出的优点：只改变需要改变的。即会通过算法计算出哪个结构是确实需要更新的而哪个不需要，之后才去作必要的 `DOM` 结构更新。







