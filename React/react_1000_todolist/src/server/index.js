import axios from 'axios'
import apis from './apis'
const ajax = axios.create({
  baseURL: apis.baseURL
})
// 在这里还可以全局拦截器处理
// some Code...
export const getTodos = () => {
  return ajax.get(apis.toods)
}
