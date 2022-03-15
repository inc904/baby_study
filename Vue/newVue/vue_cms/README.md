### 制作App组件
### Header 区域使用Mint-UI中的Header组件
引入mint-ui后，还需引入样式,才能正常显示
```js
import './lib/mui/css/mui.css'
```
### 制作底部的tabbar，使用mui，在src文件夹中手动引入mui的相关文件
需要注意定义有关字体图标的加载器
```
 { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, 
```
扩展图标引用，拷贝样式文件和字体图标ttf文件，修改相应的类名即可引用成功


### 底部菜单和图片分享页面顶部菜单栏都使用`vant`库完成
- 在分享页tab栏中，定义事件，需要借助插槽，在内部定义事件及其触发。
### 视频157p 获取图片分类下图片接口无数据 GG；

### 小球动画未完成
domObject.getBoundingClientRect()

### 使用B站网友的服务器
api文档见`api.md`文件
重构目前页面有关数据请求的部分。
1. 首页轮播图

## 用到的知识
- mui
- vue-loader

  .vue文件的处理 
- 路由
- 编程式的导航路由
- router-link  router-view
- 加载器解决各种资源的打包问题

  css sass less ttf jpg
- 组件
- vant
- axios获取数据
- 图片懒加载
- 图片缩略图预览
- 路由跳转 传递参数
- 动画、钩子动画
- vuex
