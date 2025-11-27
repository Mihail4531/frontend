"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/entities/session";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  // Используем ref, чтобы избежать двойного вызова в React Strict Mode (в режиме разработки)
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      fetchUser();
      mounted.current = true;
    }
  }, [fetchUser]);

  return <>{children}</>;
};