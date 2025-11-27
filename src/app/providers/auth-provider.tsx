"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/entities/session";
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    const timer = setTimeout(() => fetchUser());
    return () => clearTimeout(timer);
  }, [fetchUser]);

  return <>{children}</>;
};