const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s?(a|c){1}ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
      },
    ],
  },
  output: {
    publicPath: 'microfrontend/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),
  ]
});
