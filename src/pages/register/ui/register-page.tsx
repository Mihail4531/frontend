import Link from "next/link";
import { RegisterForm } from "@/features/auth/register"; // Импорт фичи
import { Card } from "@/shared/ui"; // Карточка из UI кита
import { APP_ROUTE } from "@/shared/config"; // Роуты

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Декор фона (синий, чтобы отличался от логина) */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 p-8 bg-zinc-900/80 backdrop-blur-xl border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Создать аккаунт
          </h1>
          <p className="text-zinc-400 text-sm">
            Заполните форму, чтобы присоединиться к сообществу
          </p>
        </div>

        {/* Вставляем форму регистрации */}
        <RegisterForm />
        
        {/* Ссылка на логин */}
        <p className="text-center text-sm text-zinc-500 mt-4">
            
            <Link 
              href={APP_ROUTE.auth.login()} 
              className="text-indigo-400 hover:text-indigo-300 transition font-medium"
            >
      
            </Link>
        </p>
      </Card>
    </div>
  );
};