const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
});
