import { Metadata } from "next";
import { RegisterForm } from "@/features/auth/register/ui/register-form";
import { Card } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 p-8 bg-gray-900/80 backdrop-blur-xl border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Создать аккаунт
          </h1>
          <p className="text-gray-400 text-sm">
            Заполните форму для регистрации
          </p>
        </div>

        <RegisterForm />
      </Card>
    </div>
  );
}
