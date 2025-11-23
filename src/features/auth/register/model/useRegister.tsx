import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import api from "@/api/config.api";
import { registerSchema, RegisterSchema } from "./register.schema";
// 👇 1. Импортируем стор
import { useAuthStore } from "@/stores/auth-stores";

interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}

export const useRegisterForm = () => {
  const router = useRouter();

  // 👇 2. Достаем метод обновления
  const refresh = useAuthStore((s) => s.refresh);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      // 1. Отправляем данные (Laravel создает юзера и ставит куку)
      await api.post("/register", data, { withCredentials: true });

      // 👇 3. ВАЖНО: Принудительно обновляем стор
      // Это сделает запрос /api/me, получит юзера и запишет его в состояние
      await refresh();

      // 4. Теперь безопасно редиректим в профиль
      router.push("/profile");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiValidationError>;
      const responseData = error.response?.data;

      if (responseData?.errors) {
        Object.entries(responseData.errors).forEach(([field, messages]) => {
          form.setError(field as keyof RegisterSchema, {
            message: messages[0],
          });
        });
      } else {
        form.setError("root", {
          message: responseData?.message || "Ошибка при регистрации.",
        });
      }
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
