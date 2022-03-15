const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')


const isDev = process.env.NODE_ENV === 'development'
const config = {
  mode: 'development',
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist'),
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
              name: '[name]-aa.[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // 新版本vue-loader的使用都是需要伴生 VueLoaderPlugin的
    new webpack.DefinePlugin({
      'pross.env': {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new HTMLPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
if (isDev) {
  config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },)
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 3000,
    // host: '127.0.0.1',
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    // open: true,
    // historyFallback:
    hot: true,
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else{
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      use:ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      })
    },
  )
  config.plugins.push(
    new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),
    // new webpack.optimize.CommonChunkPlugin ({
    //   name: 'vendor'
    // }),
    // new webpack.optimize.CommonChunkPlugin ({
    //   name: 'runtime'
    // }) // webpack4.0 后 废弃
    // 替代
    // config.optimization.splitChunks = {
    //   name:
    // }
  )
}

module.exports = config
