import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-stores";
import { login } from "@/services/auth/auth";
import { AxiosError } from "axios";
import { loginSchema, LoginSchema } from "./login.schema";

export const useLoginForm = () => {
  const router = useRouter();
  const refresh = useAuthStore((s) => s.refresh);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data); // 1. Запрос на бэк
      await refresh(); // 2. Обновление стейта
      router.push("/profile"); // 3. Редирект
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;

      form.setError("root", {
        message: error.response?.data?.message || "Неверный email или пароль",
      });
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
