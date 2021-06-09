const webpackConfiguration = require('./webpack.config');

const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require ('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = merge(webpackConfiguration, {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  module: {
    rules: []
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          ['svgo', { removeViewBox: false }],
        ],
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
  performance: {
    hints: false, // отключить предупреждения
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})