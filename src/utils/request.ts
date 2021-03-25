import axios from 'axios'
import { getStorageUser } from './user'
const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
})

request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const data = getStorageUser()
  if (data) {
    const { token } = JSON.parse(data)
    config.headers = {
      Authorization: `Token ${token}`
    }
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request