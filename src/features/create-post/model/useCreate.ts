import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createPostSchema, CreatePostSchema } from "./create-post.schema";
import { postApi } from "@/entities/post";

export const useCreatePost = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data: CreatePostSchema) => {
    try {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("content", data.content);

      // Теги: строка -> массив
      if (data.tags) {
        const tagsArray = data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        tagsArray.forEach((tag) => fd.append("tags[]", tag));
      }

      // Картинка
      if (file) {
        fd.append("image", file);
      }

      await postApi.create(fd);

      // После успеха можно отправить в профиль или список постов
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    preview,
    handleFileChange,
    removeFile: () => {
      setFile(null);
      setPreview(null);
    },
  };
};
