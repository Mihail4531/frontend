import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/entities/session";
import { authApi } from "@/shared/api";
import { registerSchema, RegisterSchema } from "./register.schema";
import { APP_ROUTE } from "@/shared/config";

// Интерфейс для ошибок валидации Laravel
interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}

export const useRegister = () => {
  const router = useRouter();
  const refresh = useAuthStore((s) => s.refresh);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await authApi.register(data);
      await refresh();
      router.push(APP_ROUTE.profile());
    } catch (err: unknown) {
      const error = err as AxiosError<ApiValidationError>;
      const responseData = error.response?.data;

      if (responseData?.errors) {
        Object.entries(responseData.errors).forEach(([field, messages]) => {
         
          form.setError(field as  keyof RegisterSchema, { message: messages[0] });
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