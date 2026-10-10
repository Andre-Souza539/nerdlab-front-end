'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal, BookOpen, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '@/lib/sounds';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Artigos', icon: BookOpen },
    { href: '/terminal', label: 'Terminal', icon: Terminal },
    { href: '/about', label: 'Dossier', icon: Info },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-5">
      <div className="max-w-6xl mx-auto glass rounded-2xl flex justify-between items-center px-6 py-3.5 border border-white/10 dark:border-white/10 light:border-zinc-300">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onMouseEnter={() => sounds.playBlip()}
        >
          <div className="w-9 h-9 bg-cyan-400 text-black font-black text-xs rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-cyan-400/20">
            <span>NL</span>
          </div>
          <span className="font-black tracking-widest text-lg font-display uppercase text-white dark:text-white light:text-zinc-900">
            NERDLAB
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1'
                    : 'text-zinc-400 hover:text-white dark:hover:text-white light:text-zinc-600 light:hover:text-black'
                }`}
                onMouseEnter={() => sounds.playBlip(1200, 0.01)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="h-4 w-px bg-white/10 dark:bg-white/10 light:bg-zinc-300 mx-1" />

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Auth Button */}
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-black dark:bg-white dark:text-black light:bg-zinc-900 light:text-white rounded-xl font-black text-xs hover:bg-cyan-400 hover:text-black transition-all hover:scale-105 active:scale-95 uppercase tracking-widest flex items-center gap-1.5"
            onMouseEnter={() => sounds.playData()}
          >
            <User className="w-3.5 h-3.5" />
            Auth
          </Link>
        </div>

        {/* Mobile Actions: ThemeToggle + Burger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              sounds.playBlip();
            }}
            aria-label="Abrir menu mobile"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-4 right-4 mt-3 glass rounded-3xl p-6 z-50 border border-white/10 shadow-2xl space-y-4"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-zinc-400 hover:text-white uppercase tracking-widest py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/login"
                className="w-full py-3 bg-cyan-400 text-black rounded-xl font-black text-xs uppercase tracking-widest mt-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Acessar Conta (Auth)
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
