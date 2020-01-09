const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
});
