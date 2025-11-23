"use client";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", error, ...props }, ref) => {
    // Состояние: показывать пароль или нет
    const [showPassword, setShowPassword] = useState(false);

    // Проверяем, является ли инпут паролем
    const isPasswordType = type === "password";

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          // Если это пароль и мы нажали "показать", меняем тип на text
          type={isPasswordType && showPassword ? "text" : type}
          className={`
            w-full px-4 py-3 rounded-lg transition-all outline-none border
            bg-gray-950 text-white placeholder-gray-500
            focus:ring-1 focus:ring-red-500 focus:border-red-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-500" : "border-gray-800"}
            ${isPasswordType ? "pr-10" : ""} /* Отступ справа, чтобы текст не налез на глаз */
            ${className}
          `}
          {...props}
        />

        {/* Рендерим кнопку только если тип инпута === password */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            // 👇 ЗДЕСЬ МЕНЯТЬ ЦВЕТ ГЛАЗА
            // text-gray-400 (серый по умолчанию)
            // hover:text-red-500 (красный при наведении)
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            {showPassword ? (
              // Иконка "Скрыть" (Перечеркнутый глаз)
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              // Иконка "Показать" (Обычный глаз)
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
