"use client";

import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-lg transition-all outline-none border
          bg-gray-950 text-white placeholder-gray-500
          focus:ring-1 focus:ring-red-500 focus:border-red-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-red-500" : "border-gray-800"}
          ${className}
        `}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
