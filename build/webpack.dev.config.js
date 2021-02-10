const paths = require('./paths');
const webpackConfiguration = require('./webpack.config');

const { merge } = require('webpack-merge');


module.exports = merge(webpackConfiguration, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  target: 'web',
  devServer: {
    contentBase: paths.output,
    publicPath: '/',
    // open: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: []
  },
  plugins: []
});
