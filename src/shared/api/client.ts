import axios from "axios";
import { API_URL } from "@/shared/config"; 
import { API_HEADER } from "./headers"
export const $axios = axios.create({
  baseURL: API_URL,
  headers: API_HEADER,
  withCredentials: true, 
});
$axios.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});
$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized");
    }
    return Promise.reject(error);
  }
);