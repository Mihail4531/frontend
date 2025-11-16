// Импортируем зависимости
import RegisterForm from '@/components/auth/register-form';
import { Metadata } from 'next';

// Метаданные для страницы регистрации
export const metadata: Metadata = {
  title: 'Регистрация',
};

// Страница регистрации
export default function RegisterPage() {
  return (
    <div>
      <RegisterForm /> {/* Рендерим форму регистрации */}
    </div>
  );
}