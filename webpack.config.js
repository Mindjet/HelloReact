let path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
                include: path.resolve(__dirname, './app/'),
                query: {
                    presets: ['latest']
                }
            }
        ]
    }


};