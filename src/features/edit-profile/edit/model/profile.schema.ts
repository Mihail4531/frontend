import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z
    .string()
    .url("Введите корректный URL (https://...)")
    .optional()
    .or(z.literal("")),
  github_username: z.string().optional(),
  twitter_handle: z.string().optional(),
  skills: z.string().optional(), // Мы принимаем строку "React, Vue", а не массив
});

export type ProfileSchema = z.infer<typeof profileSchema>;
