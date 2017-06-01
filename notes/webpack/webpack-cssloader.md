# Webpack基础 - cssloader

### 引入

css 的 loader 可以将 css 直接 import 到 js 文件中。在 `app` 文件夹下创建 `css` 文件夹，并创建 `common.css` 文件，在 `app` 文件夹下的 js 文件就可以以以下语句引入该 css 文件：

```javascript
import './css/common.css';
```

我们需要的 loader 是 `css-loader` 和 `style-loader`，前者是加载 css 文件，后者则是使 css 文件的样式生效。  

`webpack.config.js` 中对 css loader 的配置：

```javascript
{
    test: /\.css$/,
    loader: 'style-loader!css-loader'
}
```

打包后发现，css 代码已经被成功引入。  

不过有一个神奇的地方，在 `index.html` 中并没有出现 css 代码，但是使用浏览器打开该文件后会出现 css 代码，猜测是打开文件后执行了 `bundle.js` 脚本，该脚本将 css 代码导入了。



### 更多的loader

可以处理 css 的 loader 很多，这里介绍一下 `postcss-loader` 。顾名思义，这是一个对 css 代码进行后处理的 loader。在 npm 官网上[关于 postcss-loader 的介绍](https://www.npmjs.com/package/postcss-loader)中，了解到 `postcss-loader` 有一个叫 `autoprefixer` 的插件，可以自动在一些浏览器兼容属性上加上前缀。



### 插件配置

为 `postcss-loader` 配置 `autoprefixer` 插件之前需要安装该 loader 和插件：

```shell
npm install --save-dev postcss-loader
npm install --save-dev autoprefixer
```

之后在 `webpack.config.js` 与进行配置：

```javascript
{
    test: /\.css$/,
    loader: 'style-loader!css-loader!postcss-loader',
}
```

然后，在 `webpack.config.js` 同级目录下，创建 `postcss.config.js` 来配置 postcss-loader：

```javascript
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 5 versions']
        })
    ]
};
```



### 效果

在 `common.css` 中编写一些浏览器兼容的属性：

```css
.flex-div{
    display: flex;
}
```

之后，对项目进行打包，并打开根目录下的 `index.html` ，可以发现，其样式自动加了前缀：

```css
.flex-div{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
```

