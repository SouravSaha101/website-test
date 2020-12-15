var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require("webpack");
var proxyConfig = {};

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const CONFIG_PATH = process.env.AUTH_CONFIG_PATH && process.env.AUTH_CONFIG_PATH.toLowerCase() || 'mms'

if (ENV !== 'production') {
  proxyConfig = require('./proxy');
}

var config = {
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[chunkhash].js"
  },
  resolve: {
    extensions: [".ts", ".js", ".html", ".json"],
    alias: {
      'vue': 'vue/dist/vue.common.js'
    }
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'bluebird'
    }),
    new HtmlWebpackPlugin(Object.assign({
      template: 'index.html',
      chunksSortMode: 'dependency'
    })),
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([{
        from: 'favicon.png',
        to: 'favicon.png'
      },
      {
        from: './static/' + CONFIG_PATH + '/config.json',
        to: 'config.json'
      }
    ]),
  ],
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.ts?$/,
        loader: "awesome-typescript-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [path.resolve(__dirname, "index.html")]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.(js)$/,
        loader: "source-map-loader",
        exclude: [path.join(process.cwd(), 'node_modules')]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: ["absolute/path/a", "absolute/path/b"]
          }
        }]
      },
      {
        test: /\.(png|gif|jpg|cur)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        exclude: [
          path.resolve(__dirname, "node_modules/wc-lib/icons")
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, "node_modules/wc-lib/icons")
        ],
        use: ['svg-sprite-loader', 'svgo-loader']
      }
    ]
  },
  devServer: {
    proxy: proxyConfig,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};
module.exports = config;