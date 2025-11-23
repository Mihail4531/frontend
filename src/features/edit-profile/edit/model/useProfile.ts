import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUser } from "@/lib/types"; // Или где у вас типы юзера
import { useAuthStore } from "@/stores/auth-stores";
import { profileSchema, ProfileSchema } from "./profile.schema";

interface UseProfileFormParams {
  user: ProfileUser;
  onSuccess: () => void;
}

export const useProfileForm = ({ user, onSuccess }: UseProfileFormParams) => {
  const updateProfile = useAuthStore((s) => s.updateProfile);

  // Стейт для файла и превью (так как input type="file" сложно контролировать через react-hook-form напрямую)
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    user.avatar_url || null,
  );

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
      github_username: user.github_username || "",
      twitter_handle: user.twitter_handle || "",
      // Превращаем массив навыков обратно в строку для инпута
      skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
    },
  });

  // Обработчик выбора файла
  const handleFileChange = (file: File) => {
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file)); // Создаем временную ссылку для показа
  };

  const onSubmit = async (data: ProfileSchema) => {
    try {
      const fd = new FormData();

      // Добавляем простые поля
      fd.append("name", data.name);
      if (data.bio) fd.append("bio", data.bio);
      if (data.location) fd.append("location", data.location);
      if (data.website) fd.append("website", data.website);
      if (data.github_username)
        fd.append("github_username", data.github_username);
      if (data.twitter_handle) fd.append("twitter_handle", data.twitter_handle);

      // Обработка навыков (Строка -> Массив -> FormData[])
      if (data.skills) {
        const skillsArray = data.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        skillsArray.forEach((skill) => fd.append("skills[]", skill));
      }

      // Добавляем файл, если он был выбран
      if (avatarFile) {
        fd.append("avatar", avatarFile);
      }

      // Отправляем в Store
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
    // Экспортируем для работы с аватаром
    preview,
    handleFileChange,
  };
};
