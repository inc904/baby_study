import axios from 'axios'
const isDev = process.env.NODE_ENV === 'development'
const service = axios.create({
  // baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/176929' : ''
  baseURL: isDev ? 'https://jsonplaceholder.typicode.com' : ''
})
service.interceptors.request.use(config => {
  return config
})
service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  } else {
    // 全局处理错误
  }
})

export const getArticlesList = () => {
  return service.get('todos/1')
}
