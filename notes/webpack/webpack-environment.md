# Webpack 基础 - 环境

### 环境

- npm
- node.js

### 配置项目

1. 使用 `npm init`  后根据指示初始化 `webpack` 项目文件夹（会生成 `package.json`）
2. 使用 `npm install -g webpack` 安装全局  `webpack` 环境
3. 使用 `npm install webpack --save-dev` 将 `webpack` 作为项目依赖

### 创建必要文件/文件夹

创建 `src`文件夹放置主要逻辑文件，`build` 文件夹放置打包编译后的文件，创建 `webpack.config.js` 文件编写 `webpack` 打包配置。

项目结构如下：

```
root
 ├ node_modules
 ├ src
 │  └ index.js
 ├ build
 ├ index.html
 ├ webpack.config.js
 └ package.json
```

### webpack.config.js

这个文件是 Webpack 打包时的配置，里面包含了许多选项，具体可以查看[官网文档](http://webpack.github.io/docs/configuration.html)。  

主要先说打包入口和出口文件，我们将 `src/index.js` 打包输出到 `build/bundle.js`，配置文件可以这么写：

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  }
}
```

然后运行 `webpack` 即可将 `src/index.js` 打包到 `build/bundle.js`。但是有时候运行时会抛出：

```shell
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.output.path: The provided value "./build" is not an absolute path!
```

这时可以将 `webpack.config.js` 写成：

```javascript
let path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  }
}
```

上面的配置适用于单个文件打包至单个文件的情况，以下说明**多个文件打包至单个文件**和**多个文件打包至多个文件的**情况。

* 多个文件打包至单个文件

  比如在 `src` 目录下有 `index.js` 和 `main.js` 两个文件需要打包至 `build/bundle.js`，配置文件可以这么写：

  ```javascript
  module.exports = {
    entry: ['./src/index.js', './src/main.js'],
    output: {
      path = './build',
      filename = 'bundle.js'
    }
  }
  ```

* 多个文件打包至多个文件

  比如上个例子中的 `index.js` 和 `main.js` 分别打包至 `build/bundle1.js` 和 `build/bundle2.js` ，则配置文件可以这么写：

  ```javascript
  module.exports = {
    entry:{
      bundle1: './src/index.js',
      bundle2: './src/main.js'
    },
    output:{
      path: './build',
      filename: '[name].js'
    }
  }
  ```

  配置文件中用到了 `[name]` 占位符，代表着 `entry` 对象中的 `key`，即 `bundle1` 和 `bundle2` 。除了 `[name]` 占位符外，还有 `[hash]` 占位符和 `[chunkhash]`，分别代表**此次编译的哈希值**和**文件的hash码**。

### package.json

该文件主要包含了项目的信息，比如作者、版本号、描述、依赖等。有一个 trick 就是可以在这个文件中的 `script` 字段中配置好脚本，然后使用 `npm run xxx` 就可以执行脚本。

```json
"script":{
  "test": "echo \"Error: no test specified\" && exit 1",
  "webpack": "webpack --colors"
}
```

这里运行 `npm run webpack` 就可以达到运行 `webpack --colors` 一样的效果。

