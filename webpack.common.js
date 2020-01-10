module.exports = {
  entry: {
    main: './src/js/index.js',
    vendor: './src/js/vendor.js'
  },
  module: {
    rules: [
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
