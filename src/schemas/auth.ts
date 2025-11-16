import { z } from "zod";

// Схема для входа
export const loginSchema = z.object({
  email: z.string()
    .email("Введите корректный email")
    .nonempty("Email обязателен"),
  password: z.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .nonempty("Пароль обязателен"),
});

// Схема для регистрации
export const registerSchema = z.object({
  name: z.string()
    .min(2, "Минимум 2 символа"),
  email: z.string()
    .email("Введите корректный email")
    .nonempty("Email обязателен"),
  password: z.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .nonempty("Пароль обязателен"),
});
