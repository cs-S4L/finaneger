var webpack = require("webpack");

const momentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/js/index.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ["html-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs",
                        esModule: false
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Cookies: "js-cookie",
            moment: "moment"
        }),
        new momentLocalesPlugin({
            localesToKeep: ["de-DE"]
        })
    ]
};
