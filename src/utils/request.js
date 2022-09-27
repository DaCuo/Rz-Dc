// 引入axios
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// 修改默认配置
const require = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 判断token超时
const TimeOut = 3600 * 3
function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut
}
// 请求拦截器
require.interceptors.request.use(config => {
  // console.log(config)
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登陆超时'))
    }
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
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('登录超时')
  } else { Message.error(error.message) }

  return Promise.reject(error)
})
export default require
