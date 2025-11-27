"use client";

import { Button, Input } from "@/shared/ui";
import { useLogin} from "@/features/auth/login/model/useLogin";

export const LoginForm = () => {
  // Вся логика скрыта внутри хука
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            {...register("email")}
            placeholder="Email"
            autoComplete="email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("password")}
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* Глобальная ошибка (например, "Неверный пароль") */}
      {errors.root && (
        <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-300 text-sm text-center">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Войти
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Нет аккаунта?{" "}
        <a
          href="/register"
          className="text-red-500 hover:text-red-400 transition font-medium"
        >
          Зарегистрироваться
        </a>
      </p>
    </form>
  );
};
