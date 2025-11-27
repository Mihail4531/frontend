"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Github, Globe } from "lucide-react";
import { ProfileUser } from "../model/types";
import { UserAvatar } from "./user-avatar";

interface UserPopoverProps {
  user: Partial<ProfileUser> & { name: string };
  children: React.ReactNode;
}

export const UserPopover = ({ user, children }: UserPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 12,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", () => setIsOpen(false), true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", () => setIsOpen(false), true);
    };
  }, [isOpen]);

  const popoverContent = (
    <div
      ref={popoverRef}
      style={{ top: coords.top, left: coords.left, position: "absolute", zIndex: 50 }}
      className="w-72 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-black/90 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
    >
      <div className="h-14 bg-linear-to-r from-red-950/40 via-zinc-900 to-zinc-950 border-b border-white/5" />
      <div className="p-4 -mt-8 relative z-10">
        <div className="flex items-end gap-3 mb-3">
          <UserAvatar user={user} size="lg" className="border-4 border-zinc-950 rounded-full" />
          <div className="mb-1 overflow-hidden">
            <h4 className="font-bold text-white truncate">{user.name}</h4>
            <p className="text-xs text-zinc-500">@{user.github_username || "user"}</p>
          </div>
        </div>
        {user.bio && <p className="text-xs text-zinc-400 line-clamp-3 mb-4">{user.bio}</p>}
        {user.skills && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {user.skills.slice(0, 5).map(skill => (
              <span key={skill} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-300">{skill}</span>
            ))}
          </div>
        )}
        <div className="flex gap-3 pt-3 border-t border-white/5">
            {user.github_username && <Github className="w-4 h-4 text-zinc-500 hover:text-white transition" />}
            {user.website && <Globe className="w-4 h-4 text-zinc-500 hover:text-white transition" />}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button ref={buttonRef} onClick={toggleOpen} className="focus:outline-none">{children}</button>
      {isOpen && typeof document !== "undefined" && createPortal(popoverContent, document.body)}
    </>
  );
};