const path = require('path')
const webpack = require('webpack')
// const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath:'/dist/'
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname),
    // compress: true,
    port: 8080,
    open: true,
    // hot: true
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new htmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'index.html'),
    //   filename: 'index.html'
    // })
  ],
  module: { // 配置所有第三方加载器
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {test: /\.jpeg$/, use: 'url-loader'}
      // {
      //   test: /\.(jpeg|png|gif)$/, use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         // publicPath: './dist',
      //         name: '[name].[ext]',
      //         // limit: 15396,
      //         // outputPath: '../images/'
      //       }
      //     }
      //   ]
      // }
    ]
  }

}