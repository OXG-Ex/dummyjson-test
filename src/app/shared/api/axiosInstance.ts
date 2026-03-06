import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {useAuthStore} from '../store/authStore';

const api = axios.create({
  baseURL: '/api/external',
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

let isRefreshing = false;
let pendingRequests: ((token: string | null) => void)[] = [];

const processQueue = (token: string | null) => {
  pendingRequests.forEach((callback) => callback(token));
  pendingRequests = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as AxiosRequestConfig & {_retry?: boolean};

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const authStore = useAuthStore.getState();
          await authStore.refreshSession();
          const newToken = localStorage.getItem('accessToken') ?? null;

          isRefreshing = false;
          processQueue(newToken);

          if (newToken && originalConfig.headers) {
            originalConfig.headers.Authorization = `Bearer ${newToken}`;
          }

          return api(originalConfig);
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(null);
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        pendingRequests.push((token) => {
          if (!token) {
            reject(error);
            return;
          }

          if (originalConfig.headers) {
            originalConfig.headers.Authorization = `Bearer ${token}`;
          }
          resolve(api(originalConfig));
        });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
