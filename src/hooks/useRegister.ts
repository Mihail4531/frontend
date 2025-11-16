// src/hooks/useRegister.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register  } from '@/services/auth/auth';
import { z } from 'zod';
import { registerSchema } from '@/schemas/auth';

export const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: z.infer<typeof registerSchema>) => {
    setError(null);
    setIsLoading(true);

    try {
          await register (data); // Вызов Laravel Sanctum
          router.push('/'); // Перенаправление после успеха
        } catch (err) {
         console.log(err) 
        }
  };

  return {
    handleRegister,
    error,
    isLoading,
  };
};
