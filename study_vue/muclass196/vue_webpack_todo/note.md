## webpack+vue: todo 应用

### 技术栈

- vue
- webpack
- ssr

### 接口文档

### 配置

#### webpack-dev-server 配置

### html-webpack-plugin 配置

### jsx 语法支持和 postcss

postcss-loader
autoprefixer
babel-loader
babel-core

#### babel-plugin-transform-vue-jsx

安装 babel-loader @babel/core

```shell
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-env\
  --save-dev
```

In your `.babelrc`:

```json
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
```

## 前端的价值

### 搭建前端工程

工程化

### 网络优化

### api 定制

### nodejs 层

## 问题

### vue-loader was used without the corresponding plugin.

参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
Vue-loader 在 15.\* 之后的版本都是 vue-loader 的使用都是需要伴生 VueLoaderPlugin 的,
在 webpack.config.js 中加入

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
  ],
  module: {
    //...
  },
}
```

### sass 配置

#### 配置 loader
依赖 需要安装 node-sass

### 打包的时候，单独打包 css 文件
webpack打包环境优化的一个点：将css样式代码抽离出来。
若不抽离，可以在bundle.js中发现css代码被转化成节点样式插入到了body下；这个过程是：style-loader将外部css文件注入到html中，css内容使用css-loader进行解析，转化成js文件；因为webpack只能识别js文件。

css分离：使用extract-text-webpack-plugin插件，该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象。
安装： extract-text-webpack-plugin

#### 报错
报错： Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead

原因：

extract-text-webpack-plugin还不能支持webpack4.0.0以上的版本。

解决办法：

```shell script
npm install –save-dev extract-text-webpack-plugin@next
```

会下载到+ extract-text-webpack-plugin@4.0.0-beta.0
然后在打包就正常了


报错：  UnhandledPromiseRejectionWarning: Error: Path variable [contenthash:8] not implemented in this context

原因：
 
因为webpack 4.3 包含了 contenthash这个关键字段，所以在 ExtractPlugin 中不能使用该字段

解决：使用 md5:contenthash:hex 替换

```js
config.plugins.push(
  new ExtractPlugin('style.[md5:contenthash:hex:8].css') // 参数为静态文件名称
)
```
## webpack 区分打包类库代码及hash优化

vue 框架代码，稳定性高较高，但是业务代码 更新较快

利用浏览器的缓存减少我们的流量

### 修改 entry:
在 生产 配置中
```js
 config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
// 之后 添加 plugin
 config.plugins.push(
    new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),
    new webpack.optimize.CommonChunkPlugin({
      name: 'vendor'    
    }),
    new webpack.optimize.CommonChunkPlugin({
          name: 'runtime'    
    })  
  )
```