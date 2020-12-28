import axios from 'axios'
import { encryptByDES, decryptByDES } from './secret'

// 创建实例
const service = axios.create({
  baseURL: '/',
  timeout: 20 * 1000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加通用头部
    config.headers['Authorization'] = 'auth token'
    config.headers['Content-Type'] = 'application/json'
    // 加密
    config.transformRequest = (data) => {
      return JSON.stringify({ body: encryptByDES(data) })
    }
    // 解密
    config.transformResponse = (res) => {
      res = JSON.parse(res)
      try {
        res.data = decryptByDES(res.data)
        res.data = JSON.parse(res.data)
      } catch (error) {
        console.log('返回值不是一个json')
      }
      return res
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const body = response.data
    // 统一错误提示
    if (![200].includes(body.code)) {
      return Promise.reject(new Error(body.message || 'Error'))
    } else {
      return body
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
