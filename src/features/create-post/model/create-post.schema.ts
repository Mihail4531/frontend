import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5, "Минимум 5 символов"),
  content: z
    .string()
    .min(20, "Напишите хотя бы пару предложений (мин. 20 символов)"),
  tags: z.string().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
