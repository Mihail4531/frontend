'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/auth';
import { z } from 'zod';
import { useLogin } from '@/hooks/useLogin';

const LoginForm = () => {
  const { handleLogin, error, isLoading } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 max-w-md mx-auto mt-10">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="border p-2 w-full"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="border p-2 w-full"
        />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};

export default LoginForm;