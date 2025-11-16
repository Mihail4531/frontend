// src/lib/auth.ts
import api from '@/api/config.api';
import { z } from 'zod';
import { registerSchema, loginSchema } from '@/schemas/auth';

// Типы из схем
type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

// Регистрация
export const register = async (data: RegisterData) => {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/register", data);
};

// Вход
export const login = async (data: LoginData) => {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/login", data);
};

// Выход
export const logout = async () => {
  return api.post("/logout");
};