import { z } from "zod";
export const registerSchema = z
  .object({
    name: z.string().min(1, "Введите имя"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Минимальная длина пароля 6 символов"),
    password_confirmation: z.string().min(6, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Пароли должны совпадать",
    path: ["password_confirmation"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
