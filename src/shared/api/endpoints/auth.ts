import { LoginSchema } from "@/features/auth/login/model/login.schema";
import { $axios } from "../client";
import { RegisterSchema } from "@/features/auth/register/model/register.schema";
export const login = async (data: LoginSchema) => {
    return $axios.post("/login", data);
  };
export const register = (data: RegisterSchema) => {
  return $axios.post("/register", data);
};
export const logout = () => {
  return $axios.post("/logout");
};
export const getMe = () => {
    return $axios.get("/me")
}
