const path = require('path');
const paths = require('./paths');
const webpackConfiguration = require('./webpack.config');

const { merge } = require('webpack-merge');

module.exports = merge(webpackConfiguration, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    publicPath: '/',
    contentBase: paths.output,
    openPage: 'templates/index.html',
    open: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: []
  },

  plugins: [
  ],
})