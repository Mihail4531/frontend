
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth/auth';
import { z } from 'zod';
import { loginSchema } from '@/schemas/auth';

export const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(data); // Вызов Laravel Sanctum
      router.push('/'); // Перенаправление после успеха
    } catch (err) {
     console.log(err) 
    }
  };

  return {
    handleLogin,
    error,
    isLoading,
  };
};
