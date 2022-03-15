const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueloaderPlugin = require('vue-loader/lib/plugin.js')
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 9000,
    open: true,
    // contentBase: path.resolve(__dirname, "./src"),
    contentBase: './src',
    hot: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello virtual page',
      filename: 'index.html',
      template: path.join(__dirname, './src/index.html')
      // inject: 'head'
    }),
    new vueloaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: 'url-loader?limit=80000&name=[name].[ext]'
      },
      { test: /\.(eot|svg|woff|woff2|ttf)$/, use: 'url-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },
  resolve: {
    alias: {
      // "vue$": 'vue/dist/vue.js',
      // "vue-router$": "vue-router/dist/vue-router.js"
    }
  }
}
