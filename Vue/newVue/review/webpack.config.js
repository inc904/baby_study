const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'auto-bundle.js'
  },
  mode: 'development',

  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html'
    })
  ]

}