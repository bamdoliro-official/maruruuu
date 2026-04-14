import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ROUTES } from '@/constants/common/constant';

export const maruAdmin = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const maru = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface FailedRequest {
  resolve: () => void;
  reject: (error?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve();
    }
  });

  failedQueue = [];
};

const handleRefreshAndRetry = async (error: AxiosError, instance: typeof maru) => {
  const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

  const isTokenExpired = error.response?.status === 401 && !originalRequest._retry;

  if (isTokenExpired) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(instance(originalRequest)),
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await maru.patch('/auth');
      processQueue(null);
      return instance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      window.location.href = ROUTES.MAIN;
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
};

maru.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleRefreshAndRetry(error, maru),
);

maruAdmin.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleRefreshAndRetry(error, maruAdmin),
);
