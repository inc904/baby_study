const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const config = {
  mode: 'development',
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // 新版本vue-loader的使用都是需要伴生 VueLoaderPlugin的
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
}
module.exports = config
