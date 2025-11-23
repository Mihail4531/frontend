import api from "@/api/config.api";
import { loginSchema } from "@/features/auth/login/model/login.schema";
import { registerSchema } from "@/features/auth/register/model/register.schema";
import { z } from "zod";

export const login = async (data: z.infer<typeof loginSchema>) => {
  return api.post("/login", data);
};

export const register = async (data: z.infer<typeof registerSchema>) => {
  return api.post("/register", data);
};

export const logout = async () => {
  return api.post("/logout");
};
