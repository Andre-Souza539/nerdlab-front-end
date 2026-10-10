'use client';

import React, { useEffect, useState } from 'react';
import { TableOfContentsItem } from '@/types/api';
import { ListOrdered } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sounds.playBlip(1100, 0.02);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Sumário"
      className={`glass rounded-3xl p-6 border border-white/10 dark:border-white/10 light:border-zinc-200 sticky top-28 space-y-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold border-b border-white/5 pb-3">
        <ListOrdered className="w-4 h-4 text-cyan-400" />
        <span>Nesta Página</span>
      </div>

      <ul className="space-y-2.5 text-sm font-medium">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1 transition-all duration-200 border-l-2 pl-3 ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400 font-bold translate-x-1'
                    : 'border-transparent text-zinc-400 hover:text-white dark:hover:text-white light:text-zinc-600 light:hover:text-black hover:border-zinc-600'
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
