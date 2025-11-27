import axios from "axios";
// import { API_URL } from "@/shared/config"; 
import { API_HEADER } from "./config";

const HARD_URL = "https://gremlini.store/api";

export const $axios = axios.create({
  baseURL: HARD_URL,
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
    if (!error.response) return Promise.reject(error);
    if (error.response.status === 401) {
      console.warn("Unauthorized access");
    }
    return Promise.reject(error);
  }
);