const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2000,
            name: '/images/[name].[hash].[ext]'
          }
        }]
      },
      { test: /.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      "vue$": 'vue/dist/vue.js',
    }
  }
}