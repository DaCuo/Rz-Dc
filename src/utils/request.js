// 引入axios
import axios from 'axios'
// 修改默认配置
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
export default service
