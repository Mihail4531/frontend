import { z } from "zod";

export const editPostSchema = z.object({
  title: z.string().min(5, "Минимум 5 символов"),
  content: z.string().min(20, "Напишите хотя бы пару предложений (мин. 20 символов)"),
  // В форме теги — это строка. Мы можем проверить, что она не слишком длинная, например.
  tags: z.string().optional(),
});

export type EditPostFormValues = z.infer<typeof editPostSchema>;