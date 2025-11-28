import { z } from "zod";

export const ProfileSchema = z.object({
 name: z.string().trim().min(1, "Имя обязательно"), 
  bio: z.string().trim().optional(),
  website: z.string().trim().url("Некорректный URL").optional().or(z.literal("")),
  github_username: z.string().trim().optional(),
  skills: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;