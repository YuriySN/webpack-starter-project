const paths = require('./paths');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'

module.exports = {

  entry: {
    main: path.resolve(paths.source, 'index.js')
  },

  output: {
    path: paths.output,
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // {
      //   test: /\.vue$/,
      //   use: ['vue-loader']
      // },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [isDev?'style-loader':MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.source, 'index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.source, 'img'),
          to: path.resolve(paths.output, 'img')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ]
};