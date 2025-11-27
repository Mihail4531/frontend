"use client";

import { Button, Input } from "@/shared/ui";
import { useRegister} from "../model/useRegister";

export const RegisterForm = () => {
  const { register, handleSubmit, errors, isSubmitting } = useRegister();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Имя */}
        <div>
          <Input {...register("name")} placeholder="Ваше имя" />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input {...register("email")} type="email" placeholder="Email" />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Пароль */}
        <div>
          <Input
            {...register("password")}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Подтверждение */}
        <div>
          <Input
            {...register("password_confirmation")}
            type="password"
            placeholder="Подтверждение пароля"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
      </div>

      {/* Общая ошибка */}
      {errors.root && (
        <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-300 text-sm text-center">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Зарегистрироваться
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Уже есть аккаунт?{" "}
        <a
          href="/login"
          className="text-red-500 hover:text-red-400 transition font-medium"
        >
          Войти
        </a>
      </p>
    </form>
  );
};
