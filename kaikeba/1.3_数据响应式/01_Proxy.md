# Proxy
Proxy 对象用于定义基本的自定义行为（如属性查找、赋值、枚举、函数调用等）

## 语法
```js
const p = new Proxy(target, handler)
// target
要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
// handler
一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各操作时代理 p 的行为。
```
