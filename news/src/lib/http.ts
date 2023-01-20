import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 基礎域名
axios.defaults.baseURL = 'http://localhost:7001';

// 設置請求攔截器
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

// 設置響應攔截器
axios.interceptors.response.use((res: AxiosResponse) => {
  if(res.data.err === 1) {
    return Promise.reject(res.data.data);
  }

  return res.data;
}, (err) => {
  return Promise.reject(err);
});

export default axios;


