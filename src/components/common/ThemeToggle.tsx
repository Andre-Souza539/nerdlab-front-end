'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { sounds } from '@/lib/sounds';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    sounds.playBlip(1400, 0.02);
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Alternar tema"
      className={`relative p-2.5 rounded-xl border border-white/10 glass hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-all text-zinc-400 hover:text-white dark:hover:text-white light:text-zinc-600 light:hover:text-black flex items-center justify-center cursor-pointer ${className}`}
      title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 animate-in fade-in zoom-in duration-200" />
      )}
    </button>
  );
}
