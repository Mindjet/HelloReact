let path = require('path');

module.exports = {
    entry: './src/index.js',
    output: { // 打包目标路径
        path: path.resolve(__dirname, './build'),
        filename: "bundle.js"
    },
    resolve: {
        "extensions": [".js", ".jsx"]  //当requrie的模块找不到时，添加这些后缀
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_module/,
                query: {
                    compact: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};