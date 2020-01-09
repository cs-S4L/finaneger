const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/template.html'
        })
    ],
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
        ]
    },
});
