'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Tag as TagIcon } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface SearchAndFilterProps {
  categories: string[];
  selectedCategory?: string;
  onSearch: (query: string) => void;
  onSelectCategory: (category: string) => void;
  className?: string;
}

// Higienização de entrada contra ataques XSS
export function sanitizeSearchInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>'"`;()]/g, '')
    .trim();
}

export function SearchAndFilter({
  categories,
  selectedCategory = '',
  onSearch,
  onSelectCategory,
  className = '',
}: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const sanitized = sanitizeSearchInput(searchTerm);
      onSearch(sanitized);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  const handleCategoryClick = (cat: string) => {
    sounds.playBlip(1200, 0.02);
    if (selectedCategory.toLowerCase() === cat.toLowerCase()) {
      onSelectCategory(''); // Desmarca se já estiver selecionada
    } else {
      onSelectCategory(cat);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Input de Busca com Debounce */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar artigos, tecnologias ou conceitos..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl glass border border-white/10 dark:border-white/10 light:border-zinc-300 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-white text-white dark:text-white light:text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm md:text-base smooth-transition"
          aria-label="Campo de busca de artigos"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
            title="Limpar busca"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Chips de Categorias / Tags */}
      {categories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono flex items-center gap-1.5 mr-2">
            <TagIcon className="w-3.5 h-3.5" />
            Filtrar:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                role="button"
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20 font-bold scale-105'
                    : 'glass text-zinc-400 hover:text-white dark:hover:text-white light:text-zinc-600 light:hover:text-black hover:border-cyan-400/50'
                }`}
                aria-pressed={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
