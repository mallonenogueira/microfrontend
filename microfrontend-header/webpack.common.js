const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  entry: {
    "header": "./src/index-header.js",
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    filename: "[name].js",
    // filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CopyWebpackPlugin([{ from: "./public", to: "./" }]),
    new WebpackManifestPlugin(),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
    runtimeChunk: false,
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // }
};
