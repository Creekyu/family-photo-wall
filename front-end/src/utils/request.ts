import axios from 'axios';
import Cookies from 'universal-cookie';
import { BASE_URL } from '@/global';

const service = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
});

// 都用json发数据
service.defaults.headers.post['Content-Type'] = 'application/json';
service.defaults.withCredentials = true;
//请求拦截器
service.interceptors.request.use((config) => {
  // 附加token
  const cookies = new Cookies();
  const token = cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//响应拦截器
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    if (error.response.status) {
      // antd的全局message会报错，所以信息回馈由catchAsync处理
      // 这里只处理副作用
      switch (error.response.status) {
        case 403: {
          const cookies = new Cookies();
          cookies.remove('user');
          cookies.remove('token');
          break;
        }
      }
      return Promise.reject(error.response);
    }
  }
);

export default service;
