import { Metadata } from "next";
import { LoginForm } from "@/features/auth/login/ui/login-form";
import { Card } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Фоновый эффект */}
      <div className="absolute w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 p-8 bg-gray-900/80 backdrop-blur-xl border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">С возвращением</h1>
          <p className="text-gray-400 text-sm">
            Введите данные для входа в аккаунт
          </p>
        </div>

        <LoginForm />
      </Card>
    </div>
  );
}
