let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})
module.exports = {
  mode: 'development',
  plugins: [htmlPlugin]
}
