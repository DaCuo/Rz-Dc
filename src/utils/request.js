// 引入axios
import axios from 'axios'
import { Message } from 'element-ui'
// 修改默认配置
const require = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

require.interceptors.response.use(response => {
  console.log(response)
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
