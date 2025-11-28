import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Post, postApi, UpdatePostData } from "@/entities/post";
import { editPostSchema, EditPostFormValues } from "./edit-post.schema";

interface UseEditPostProps {
  post: Post;
  onSuccess?: () => void;
}

export const useEditPost = ({ post, onSuccess }: UseEditPostProps) => {
  const router = useRouter();

  // 1. Инициализируем форму
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditPostFormValues>({
    resolver: zodResolver(editPostSchema),
    // Заполняем форму данными из поста
    defaultValues: {
      title: post.title,
      content: post.content,
      // Превращаем массив тегов [{name: "a"}, {name: "b"}] в строку "a, b"
      tags: post.tags?.map((t) => t.name).join(", ") || "",
    },
  });

  // 2. Функция отправки (вызовется только если валидация прошла успешно)
  const onSubmit = async (data: EditPostFormValues) => {
    try {
      // Превращаем строку тегов обратно в массив для API
      const tagsArray = data.tags
        ? data.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
        : [];

      const updatePayload: UpdatePostData = {
        title: data.title,
        content: data.content,
        tags: tagsArray,
      };

      await postApi.update(post.id, updatePayload);
      
      alert("Пост успешно обновлен!");

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      console.error("Ошибка обновления:", error);
      alert("Ошибка при сохранении. Возможно, пост уже опубликован.");
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    // Оборачиваем наш onSubmit в handleSubmit от react-hook-form
    onSubmit: handleSubmit(onSubmit),
  };
};