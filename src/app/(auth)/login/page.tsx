// Импортируем зависимости
import LoginForm from '@/components/auth/login-form';
import { Metadata } from 'next';

// Метаданные для страницы входа
export const metadata: Metadata = {
  title: 'Авторизация',
};

// Страница входа
export default function LoginPage() {
  return (
    <div>
      <LoginForm /> {/* Рендерим форму входа */}
    </div>
  );
}