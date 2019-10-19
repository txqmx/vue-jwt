/* eslint-disable no-param-reassign */
import axios from 'axios';

// 每个请求的拦截器方法可能不一样

class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';
    this.timeout = 2000;
  }

  request(config) { // 用户请求设置的方法
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    });
    // 请求拦截 会在请求的时候拦截当前请求
    instance.interceptors.request.use((config1) => {
      config1.headers.Authorization = localStorage.getItem('token');
      return config1;
    }, err => Promise.reject(err));
    // 响应拦截
    instance.interceptors.response.use(res => res.data, err => Promise.reject(err));

    return instance(config);
  }
}

export default new AjaxRequest();
