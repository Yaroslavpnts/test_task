import axios, { InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '../utils/cookies';
import { API_URL } from '../config';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.headers) {
      config.headers['Token'] = getCookie('token');
    }

    return config;
  },
  error => {
    console.log(error);
  }
);

export { instance };
