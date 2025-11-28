import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createPostSchema, CreatePostSchema } from "./create-post.schema";
import { postApi } from "@/entities/post";

export const useCreatePost = () => {
  const router = useRouter();
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: CreatePostSchema) => {
    try {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("content", data.content);
      if (data.tags) {
        const tagsArray = data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        tagsArray.forEach((tag) => fd.append("tags[]", tag));
      }
      await postApi.create(fd);
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
  };
};