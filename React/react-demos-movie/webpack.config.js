let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})
module.exports = {
  mode: 'development', // production
  entry: path.resolve(__dirname, 'src/index.js'), // 项目入口文件
  output: {
    // 配置输出选项
    path: path.resolve(__dirname, 'dist'), // 配置输出的路径
    filename: 'main.js' // 配置输出的文件名
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(jpg|png|gif|bmp|jpeg|svg)$/,
        use: 'url-loader?limit=5000&name=images/[name].[ext]'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, './src')
    }
  }
}
