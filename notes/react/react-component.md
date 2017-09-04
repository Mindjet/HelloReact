# React - 组件

### 组件思想

何为组件思想？个人认为是将实现某种特定功能的界面和逻辑代码，包括 `html`，`css` 和 `js` 打包成一个模块，对外暴露一定的接口，在实现复用的时候保持可定制性和较高的扩展性。  

`React` 的组件还具有生命周期，并且有低耦合/高内聚的特点。



### prop/state

上面讲到组件对外暴露一定的接口，这些接口其实是通过 `prop` 来体现的；而组件内部的状态管理是通过 `state` 来实现的。

即，`prop`：接受外部数据；`state`：管理内部状态。  

比如说我们有个一组件使用方法如下：

```html
<TextView content="This is a textview"/>
```

那么，在该组件的 `constructor` 中，可以获取到关于 `content` 字段的 prop：

```js
constructor(props) {
    super(props);
  	console.log(props.content);		//This is a textview
}
```

同时，我们一般会在 `constructor` 中初始化 `state`，并在 `render` 中使用：

```js
constructor(props) {
    super(props);
  	this.state = { content: props.content };
}

render() {
 	return <p>{this.state.content}</p>
}
```

此时，如果有事件触发更新 `p` 标签的文字，我们应该去改变 `state` 而不是 `prop`。正如上面所说， `prop` 是对接受外部数据，是作为组件的初始属性，一般是不可变的，而 `state` 是维护组件内部状态，所以一般是可变的。

组件的 `state` 是通过 `setState` 来改变的：

```js
this.setState({
    content: "This is a new content"
});
```

由于 `React` 对于 `state` 是响应式的，`state` 一旦发生变化，便会在 UI 上更新。如果直接对 `state` 的字段赋值，则不会触发 UI 更新，这种做法也不推荐。

关于 `prop`，还有以下几点需要留意的：
* **prop 的初始化**  
`prop` 的初始化是发生在 `constructor` 中的，在 `constructor` 中，我们会调用父类，即  `React.Component` 的构造方法：

  ```JSX
  constructor(props) {
      super(props);
  }
  ```
  如果不调用父类的构造方法，那么是无法通过 `this.props.xxx` 来访问到 `prop` 的。

* **propType**  
  `propType` 规定了组件允许接受的 `prop` 的类型，如上面的 `TextView` 组件，我们让其 `content` 只允许接受 `String` 类型的数据，我们加入以下代码：
  ```JSX
  TextView.propType = {
      content: PropTypes.string.isRequired
    //content: PropTypes.string
  }
  ```
  其中，`isRequired` 表示必须提供该 `prop`。

  但其实，`propType` 只适合用在开发阶段，因为在正式环境中没有检查的必要了，就算打印出错误的信息，用户也不能看懂，而且多余的代码也可能会损失性能。

* **defaultProps**  
  可以为 `prop` 指定默认值：

  ```jsx
  TextView.defaultProps = {
      content: "This is a content"
  }
  ```
### 生命周期

`React` 组件存在生命周期，便于在组件的不同加载阶段对其进行控制。

组件渲染的主线是：`constructor -> componentWillMount -> render -> componentDidMount`

- #### constructor

顾名思义，构造方法，在该类被实例化时被调用。在此方法中，一般会对 `state` 进行初始化。但如果组件是无状态的，即不需要 `state`，那么 `constructor` 可以不重写。

- #### componentWillMount

组件即将渲染，一般不做操作，该方法很大程度上是为了对应下面的 `componentDidMount`。

- #### render

组件中最重要的、必须实现的方法。方法返回 DOM 结构用以渲染到真实的 DOM 结构中，如果不想显示任何东西，则返回 `false` 或 `null`。

`render` 方法并不直接渲染 DOM 结构，而是返回一个用 `JSX` 表示的对象，然后由 `React` 去决定如何渲染。  

该函数是一个纯函数，不应该引起状态的改变，即不能在该方法中调用 `setState`。

- #### componentDidMount

组件已经被加载到 DOM 树上，发生在 `render` 方法之后（但不是紧接着）。此时组件所有 DOM 均可以访问到。

- #### componentWillReceiveProps(nextProps)

一般而言，该方法是在父组件传给该组件的 `props` 发生变化时调用，我们可以在这个方法里面更新该组件（setState），来实现父组件与子组件间的通讯。

但其实，只要是父组件的 `render` 方法被调用了，无论传给该组件的 `props` 有没有发生变化，都会触发该组件的 `componentWillReceiveProps` 方法，并把 `props` 传进来。所以我们要比较传进来的 `props(nextProps)`和现在的 `props`，发现不同才去更新组件。

- #### shouldComponentUpdate(nextProps, nextState)

该方法的返回值决定了该不该更新。通过 `setState` 改变`state` 后，`state` 并不会立即更新，而是在该方法内计算出更新的必要性。

该方法默认返回 `true`，重写该方法可以减少无效 `render` 的次数。

- #### componentWillUnmount

组件从 DOM 树上卸载，可以在该方法释放资源。
