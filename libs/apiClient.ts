'use client'
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'

interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
    retryCount?: number
    _retry?: boolean
}

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000',
    withCredentials: true
})

apiClient.interceptors.request.use(
    async (config: ExtendedRequestConfig) => {
        try {
            config.retryCount = config.retryCount || 0

            const token = useAuthStore.getState().token

            if (token) {
                config.headers = config.headers || {}
                config.headers['Authorization'] = `Bearer ${token}`
            }

            return config
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

apiClient.interceptors.response.use(
  (res: any) => res,
  async (error) => {
    const originalRequest: ExtendedRequestConfig = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        if (!refreshToken) {
          useAuthStore.getState().logout();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}/api/v1/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true }
        );

        if (refreshRes.status === 200) {
          const newAccessToken = refreshRes.data.token;
          useAuthStore.getState().setToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient
