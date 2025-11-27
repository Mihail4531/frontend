import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  bio: z.string().optional(),
  website: z.string().url("Некорректный URL").optional().or(z.literal("")),
  github_username: z.string().optional(),
  skills: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;