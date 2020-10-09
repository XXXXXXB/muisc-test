import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  console.log(error)
})
request.interceptors.response.use(function (data) {
  return data
}, error => {
  console.log(error)
})
export default request
