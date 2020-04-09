const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.s?(a|c){1}ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
});
