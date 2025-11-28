"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/entities/session";
import { UserPreview } from "@/entities/user";
import { LogoutButton } from "@/features/auth/logout/ui/logout-button";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { AuthButton } from "./auth-button";
import { SIDEBAR_NAVIGATION } from "../config/navigation";
import { Menu } from "lucide-react";

export const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuthStore();
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleNavigate = () => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  };
  const logoutStyles ="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-lg transition-all bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-medium";
  return (
    <>
      {isMobile && isCollapsed && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-black rounded-lg text-white md:hidden"
          onClick={() => setIsCollapsed(false)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      <aside
        className={`bg-black border-r border-zinc-900 flex flex-col transition-all duration-300 ease-out ${
          isMobile
            ? `fixed top-0 left-0 z-50 h-screen w-80 ${
                isCollapsed ? "-translate-x-full" : "translate-x-0"
              }`
            : `h-screen sticky top-0 ${isCollapsed ? "w-20" : "w-80"}`
        }`}
      >
        <Logo
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
        <Navigation
          items={SIDEBAR_NAVIGATION}
          isCollapsed={isCollapsed}
          onNavigate={handleNavigate}
        />
        <div className="mt-auto p-4 border-t border-zinc-900 space-y-2">
          <AuthButton isCollapsed={isCollapsed} onNavigate={handleNavigate} />
          {user && (
            <LogoutButton
              isCollapsed={isCollapsed}
              className={logoutStyles}
            />
          )}
          {user && (
            <Link
              href="/profile"
              onClick={handleNavigate}
              className="block p-2 rounded-lg hover:bg-zinc-900 transition-colors mt-2"
            >
              <UserPreview user={user} minimized={isCollapsed} />
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};