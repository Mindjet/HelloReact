# Webpack基础 - jsloader

### 作用

webpack 中的 `loader` 加载资源文件生成可以被 webpack 使用的文件。webpack 主要处理的文件是 .js 文件，也就是说 `loader` 可以将其他类型的资源文件转换成 js 文件。



### 下载

以 `babel-loader` 为例，`babel-loader` 为将 es6 语法转成可以被主流浏览器运行的 es5 语法的 loader。  

用以下命令下载并且添加到项目依赖：  

```shell
npm install --save-dev babel-loader babel-core
```



### 配置 

在 webpack.config.js 中作以下配置：

```javascript
module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['latest']
                }
            }
        ]
    }
```

其中，`test` 指定了 loader 的目标文件后缀，`loader` 执行 loader，`query` 是 loader 的参数（额外选项），这里选择的是**最新的es语法**。

使用该参数也要下载相应的依赖：

```shell
npm install --save-dev babel-preset-latest
```



### 打包提速

在 webpack.config.js 中为 `babel-loader` 加入相应的选项可以调整 loader 的作用。

```shell
{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: './node_modules/',
    include: './app/',
    query: {
        presets: ['latest']
    }
}
```

其中，`exclude` 表示 `babel-loader` 不进行加载的目录，`include` 则 `babel-loader` 加载的目录。我们的目标文件都放在 `app` 文件夹中，这样一来 `babel-loader` 就只加载需要的文件，打包速度自然得到了提高。