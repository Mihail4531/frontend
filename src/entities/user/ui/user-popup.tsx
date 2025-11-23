'use client';

import { useState, useRef, useEffect } from 'react';
import { ProfileUser } from '@/lib/types';
import { MapPin, Github, Twitter, Globe } from 'lucide-react';
import Link from 'next/link';

interface Props {
  user: Partial<ProfileUser> & { name: string };
  children: React.ReactNode;
}

export const UserPopover = ({ user, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Закрытие по клику вне (оставляем как было)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="block focus:outline-none transition-transform active:scale-95"
      >
        {children}
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 top-full mt-2 w-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          
          <div className="h-12 bg-gradient-to-r from-red-900/50 to-zinc-900 border-b border-white/5" />

          <div className="p-5 -mt-6">
            {/* Аватар и Имя */}
            <div className="flex items-end gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-black ring-4 ring-zinc-900 overflow-hidden">
                    {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs">?</div>
                    )}
                </div>
                
            </div>
            {user.bio && (
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {user.bio}
                </p>
            )}
            {user.skills && user.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {user.skills.slice(0, 6).map((skill) => (
                        <span 
                            key={skill} 
                            className="px-2 py-0.5 bg-zinc-800 border border-white/5 rounded text-[10px] font-medium text-zinc-300 cursor-default hover:border-white/20 transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                    {user.skills.length > 6 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-zinc-600">
                            +{user.skills.length - 6}
                        </span>
                    )}
                </div>
            )}

            {/* Соцсети */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                <div className="flex gap-3">
                    {user.github_username && (
                        <a href={`https://github.com/${user.github_username}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                    {user.website && (
                        <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                            <Globe className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};