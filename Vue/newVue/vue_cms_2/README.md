## 制作App组件
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
### 视频157p 获取图片分类下图片接口无数据 GG
### 使用B站网友的服务器
