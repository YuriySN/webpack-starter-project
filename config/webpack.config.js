const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require("beautify-html-webpack-plugin");

const paths = require("./paths");

const isDev = process.env.NODE_ENV === "development";
const PAGES_DIR = path.resolve(paths.source, "pug", "pages");
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".pug"));

module.exports = {
  entry: {
    main: path.resolve(paths.source, "./js/index.js"),
  },

  output: {
    path: paths.output,
    filename: "static/js/[name].js",
    // clean: true,
  },

  optimization: {
    splitChunks: {
      name: "vendors",
      chunks: "all",
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: isDev
          ? ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
          : [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/inline",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.source, "./pug/index.pug"),
      // filename: './templates/index.html',
      filename: "./index.html",
      inject: "body",
    }),

    // ...PAGES.map((page) => new HtmlWebpackPlugin({
    //   template: path.resolve(PAGES_DIR, page),
    //   filename: `./templates/${page.replace(/\.pug/,'.html')}`,
    //   inject: true,
    // })),

    new BeautifyHtmlWebpackPlugin({
      indent_size: 2,
      indent_with_tabs: false,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.source, "assets"),
          to: path.resolve(paths.output, "static"),
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    }),
  ],
};
