import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().trim()
    .min(1, "Имя обязательно")
    .max(50, "Имя слишком длинное (макс. 50)"),

  bio: z.string().trim()
    .max(300, "О себе: максимум 500 символов")
    .optional(),

  website: z.string()
    .trim()
    .max(100, "Ссылка слишком длинная (макс. 255 символов)") 
    .url("Некорректный формат ссылки (должна начинаться с http:// или https://)")
    .optional()
    .or(z.literal("")),

  github_username: z.string().trim()
    .max(50, "Никнейм слишком длинный")
    .optional(),

  skills: z.string().trim()
    .max(80, "Слишком много текста")
    .optional(),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;