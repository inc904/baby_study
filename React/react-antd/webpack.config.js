let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})
module.exports = {
  mode: 'development',
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
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: 'url-loader?limit=5000&name=images/[name].[ext]'
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
