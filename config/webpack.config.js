const path = require('path');
const paths = require('./paths');

const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const PAGES_DIR = path.resolve(paths.source, 'pug', 'pages')
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

// console.log(111111111111)
// console.log(PAGES_DIR)
// console.log(PAGES)

module.exports = {

  entry: {
    main: path.resolve(paths.source, './js/index.js')
  },

  output: {
    path: paths.output,
    filename: 'static/js/[name].js'
  },

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
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          {
            use: ['raw-loader', 'pug-plain-loader'],
          },
        ],
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
          use: isDev ? ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.source, './pug/index.pug'),
      filename: 'templates/index.html',
    }),

    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: path.resolve(PAGES_DIR, page),
      filename: `./templates/${page.replace(/\.pug/,'.html')}`,
      inject: true,
    })), 

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.source, 'assets'),
          to: path.resolve(paths.output, 'static')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css'
    })
  ]
};