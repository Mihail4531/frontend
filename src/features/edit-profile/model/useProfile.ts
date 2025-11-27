import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUser } from "@/entities/user";
import { useAuthStore } from "@/entities/session"; // Импорт из entities
import { ProfileSchema } from "./profile.schema";

interface UseProfileParams {
  user: ProfileUser;
  onSuccess: () => void;
}

export const useEditProfile = ({ user, onSuccess }: UseProfileParams) => {
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user.avatar_url || null);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      website: user.website || "",
      github_username: user.github_username || "",
      skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
    },
  });

  const handleFileChange = (file: File) => {
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: ProfileSchema) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      if (data.bio) fd.append("bio", data.bio);
      if (data.website) fd.append("website", data.website);
      if (data.github_username) fd.append("github_username", data.github_username);
      if (data.skills) {
        data.skills.split(",").map(s => s.trim()).filter(Boolean)
            .forEach(skill => fd.append("skills[]", skill));
      }

      if (avatarFile) fd.append("avatar", avatarFile);

      await updateProfile(fd);
      onSuccess();
    } catch (error) {
      console.error(error);
      form.setError("root", { message: "Не удалось сохранить профиль" });
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    preview,
    handleFileChange,
  };
};