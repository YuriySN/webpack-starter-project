const path = require('path');
const paths = require('./paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

module.exports = {

  entry: {
    main: path.resolve(paths.source, './js/index.js')
  },

  output: {
    path: paths.output,
    filename: 'js/[name].[hash].js',
    publicPath: './'
  },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: 'vendors',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },

  optimization: {
    splitChunks: {
      name: 'vendors',
      chunks: 'all',
    },
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // {
      //   test: /\.html$/,
      //   use: ['html-loader']
      // },
      // {
      //   test: /\.pug$/,
      //   // use: ['pug-loader']
      //   use: ['raw-loader', 'pug-plain-loader']
      // },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
          use: isDev ? ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.source, './pug/index.pug'),
      filename: 'index.html',
      favicon: paths.source + '/assets/img/favicon.ico'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.source, 'assets'),
          to: path.resolve(paths.output, 'static')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css'
    })
  ]
};