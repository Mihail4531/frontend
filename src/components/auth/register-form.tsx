'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/auth';
import { z } from 'zod';
import { useRegister } from '@/hooks/useRegister';

const RegisterForm = () => {
  const { handleRegister, error, isLoading } = useRegister();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 max-w-md mx-auto mt-10">
      <div>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="border p-2 w-full"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>

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
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default RegisterForm;
