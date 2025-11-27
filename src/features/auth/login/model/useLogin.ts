import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/entities/session"; // ✅ Импорт из entities
import { authApi } from "@/shared/api"; // ✅ Импорт из shared/api
import { loginSchema, LoginSchema } from "./login.schema";
import { APP_ROUTE } from "@/shared/config";

export const useLogin = () => {
  const router = useRouter();
  const refresh = useAuthStore((s) => s.refresh);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await authApi.login(data);
      await refresh();
      router.push(APP_ROUTE.profile());
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