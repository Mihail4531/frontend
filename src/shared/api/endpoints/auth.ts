import { $axios } from "../client";
export interface LoginDTO {
  email: string;
  password: string;
}
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export const login = (data: LoginDTO) => {
  return $axios.post("/login", data);
};
export const register = (data: RegisterDTO) => {
  return $axios.post("/register", data);
};
export const logout = () => {
  return $axios.post("/logout");
};
export const getMe = () => {
    return $axios.get("/me")
}
