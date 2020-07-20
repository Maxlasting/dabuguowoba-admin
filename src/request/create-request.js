import axios from 'axios'
import { Message } from 'ant-design-vue'

const request = axios.create({})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('x_blog_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const createRequest = request => new Promise((resolve, reject) => {
  request
    .then((res) => {
      resolve(res.data)
    })
    .catch(async (err) => {
      Message.destroy()
      Message.error('接口请求失败')
      reject(err)
    })
})

export { request, createRequest }
