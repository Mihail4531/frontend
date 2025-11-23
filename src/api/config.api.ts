// src/api/config.api.ts
import axios from "axios";
import { API_URL, API_HEADER } from "@/lib/constants";

const api = axios.create({
  baseURL: API_URL,
  headers: API_HEADER, // Тут лежит Content-Type: application/json
  withCredentials: true,
});

// 👇 ДОБАВЬТЕ ЭТОТ БЛОК (Request Interceptor)
api.interceptors.request.use((config) => {
  // Если мы отправляем FormData (файлы)...
  if (config.data instanceof FormData) {
    // ...то удаляем Content-Type, чтобы браузер сам подставил
    // multipart/form-data и правильный boundary
    delete config.headers["Content-Type"];
  }
  return config;
});

// Ваш существующий Response Interceptor оставляем как есть
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default api;
