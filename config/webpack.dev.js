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
    // publicPath: '/templates/',
    // publicPath: '/static/',
    contentBase: path.resolve(paths.output, 'templates'),
    // contentBase: paths.output,
    // openPage: '/templates/index.html',
    // index: 'index.html',
    hot: true,
    port: 8080,
    // open: true,
  },
  module: {
    rules: []
  },
  plugins: []
})