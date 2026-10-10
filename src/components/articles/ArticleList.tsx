'use client';

import React from 'react';
import { PostCard } from './PostCard';
import { PostSummary } from '@/types/api';
import { AlertCircle, RefreshCw, FileSearch } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface ArticleListProps {
  articles: PostSummary[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function ArticleList({
  articles,
  isLoading = false,
  isError = false,
  onRetry,
  className = '',
}: ArticleListProps) {
  // Estado de Carregamento: Renderiza Skeletons animados
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
        aria-label="Carregando artigos..."
      >
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            data-testid="article-card-skeleton"
            className="glass rounded-3xl overflow-hidden border border-white/5 animate-pulse flex flex-col h-[400px]"
          >
            <div className="h-48 bg-zinc-800/60 w-full" />
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-4 bg-zinc-800 rounded w-24" />
                  <div className="h-4 bg-zinc-800 rounded w-20" />
                </div>
                <div className="h-6 bg-zinc-800 rounded w-3/4" />
                <div className="space-y-2 pt-2">
                  <div className="h-3.5 bg-zinc-800/70 rounded w-full" />
                  <div className="h-3.5 bg-zinc-800/70 rounded w-5/6" />
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-800" />
                  <div className="h-3 bg-zinc-800 rounded w-20" />
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Estado de Erro
  if (isError) {
    return (
      <div className="glass rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 border border-red-500/20 my-8">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white dark:text-white light:text-zinc-900">
            Não foi possível carregar os artigos
          </h3>
          <p className="text-zinc-400 text-sm">
            Ocorreu uma falha na comunicação com o servidor de dados. Por favor, tente novamente.
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={() => {
              sounds.playBlip();
              onRetry();
            }}
            className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  // Estado Vazio (Empty State)
  if (!articles || articles.length === 0) {
    return (
      <div className="glass rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 border border-white/10 my-8">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
          <FileSearch className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white dark:text-white light:text-zinc-900">
            Nenhum artigo encontrado
          </h3>
          <p className="text-zinc-400 text-sm">
            Não localizamos nenhum conteúdo correspondente aos filtros ou termo de busca informado.
          </p>
        </div>
      </div>
    );
  }

  // Grid de Artigos
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {articles.map((article) => (
        <PostCard key={article.id} post={article} />
      ))}
    </div>
  );
}
