const paths = require('./paths');
const webpackConfiguration = require('./webpack.config');

const { merge } = require('webpack-merge');

module.exports = merge(webpackConfiguration, {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  module: {
    rules: []
  },
  plugins: []
});