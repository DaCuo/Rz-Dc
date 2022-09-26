// 引入axios
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// 修改默认配置
const require = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器

require.interceptors.request.use(config => {
  // console.log(config)
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 返回拦截器
require.interceptors.response.use(response => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } // 成功
  Message.error(message) // 失败
  return Promise.reject(new Error(message))
},
error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default require
