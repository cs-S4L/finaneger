const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
    vendor: './src/js/vendor.js'
  },
  plugins: [
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
      {
        test: /\.html$/i,
        use: [
          'html-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
            esModule: false,
          }
        },
      },
    ],
  },
};
