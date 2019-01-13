import axios from 'axios'
import {Toast} from 'antd-mobile'

axios.interceptors.request.use((req) => {
  Toast.loading('loading')
  return req
})

axios.interceptors.response.use((res) => {
  setTimeout(() => Toast.hide(), 1000)
  return res
})