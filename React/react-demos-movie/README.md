## 数据请求

### 工具

fetch-jsonp

### Api

正在热映：

## 项目知识点回顾：

- App 页面，创建引入三个页面分类组件，改造链接，实现路由。

1. HashRouter
2. Link
3. Route

```jsx
render(){
  return (
  <HashRouter>
    <Link to="/movie">电影</link>
    <Route path="/movie" component={Movie}></Route>
  </HasgRouter>
  )
}
```

- Movie 页面

1. Link
2. Route
3. 引入组件 MovieList 子组件
4. 三个分类条目侧边栏菜单
5. Switch 路由条件渲染组件

   exact 开始精确匹配，按路由规则渲染 item 列表组件，或者 详情 组件

- MovieList 页面

1. antd UI 组件
2. prop-types 类型校验插件
3. UNSAFE_componentWillMount 组件将要挂载钩子函数中请求数据
4. UNSAFE_componentWillReceiveProps 组件将要接收父组件 Movie 传递 过来的 Props 属性

   传递的 Props 是分类条目，根据分类 重新请求数据

5. 给 detail 组件传递 数据，还传递 history 路由跳转对象
6. 设置分页, 设置分页点击事件，根据事件参数，渲染路由地址，请求分页数据

- MovieDetail 组件

1. componentWillMount

   根据 ID 请求数据

   this.Props 传递过来的属性

   id：this.params.match.params.id

2. 设置返回按钮

   编程式跳转路由 -1

### 路由：

- react-router-dom
- Link
- Route
- HashRouter

### 编程式跳转

```

```
