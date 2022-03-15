const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.png$/, use: 'url-loader' },
      { test: /.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
    ]
  }
}