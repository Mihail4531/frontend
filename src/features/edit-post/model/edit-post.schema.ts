import { z } from "zod";

export const editPostSchema = z.object({
  title: z.string().min(5, "Минимум 5 символов").max(20, "Слишком много слов для заголовка"),
  content: z.string().min(20, "Напишите хотя бы пару предложений (мин. 20 символов)"),
  tags: z.string().optional(),
});

export type EditPostFormValues = z.infer<typeof editPostSchema>;