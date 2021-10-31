const { merge } = require("webpack-merge");

const webpackConfiguration = require("./webpack.config");

module.exports = merge(webpackConfiguration, {
  mode: "development",
  devtool: "inline-source-map",
  target: "web",
  devServer: {
    open: true,
    port: 8080,
  },

  module: {
    rules: [],
  },

  plugins: [],
});
