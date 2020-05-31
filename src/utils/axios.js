import axios from 'axios';

// 加载中效果
import { Toast } from 'antd-mobile'

// 基础链接
const baseUrl = 'https://api-haoke-web.itheima.net';
// 创建实例
const connect = axios.create({
  baseURL: baseUrl
})

// 请求拦截器
connect.interceptors.request.use(
  function (request) {
    // 在请求发出前做...
    // 显示加载中提示窗
    Toast.loading('加载中...')
    console.log('请求之前触发', request)
    return request;
  }, function (error) {
    // 错误
    return Promise.reject(error);
  }
)
// 响应拦截器
connect.interceptors.response.use(
  function (response) {
    // 在响应前做...
    // 隐藏加载中提示窗
    Toast.hide()
    const data = {
      status: response.data.status,
      description: response.data.description,
      data: response.data.body
    }
    console.log(data);

    return data;
  }, function (error) {
    // 错误
    return Promise.reject(error);
  }
)




export { baseUrl }
export default connect


