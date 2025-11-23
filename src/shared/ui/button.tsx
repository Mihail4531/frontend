import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  isLoading,
  children,
  className = "",
  ...props
}: Props) => {
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white",
    secondary:
      "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
    danger:
      "bg-red-900/20 hover:bg-red-900/50 text-red-400 border border-red-900/30",
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  );
};
