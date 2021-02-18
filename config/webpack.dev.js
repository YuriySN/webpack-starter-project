const paths = require('./paths');
const webpackConfiguration = require('./webpack.config');

const { merge } = require('webpack-merge');

module.exports = merge(webpackConfiguration, {
  mode: 'development',
  // devtool: 'source-map',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: paths.output,
    publicPath: '/',
    hot: true,
    inline: true,
    port: 8080,
    // open: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.((c|sa|sc)ss)$/i,
      //     use: ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      // }
    ]
  },
  plugins: [

  ]
});