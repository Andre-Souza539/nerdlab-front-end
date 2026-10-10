'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowUpRight, User } from 'lucide-react';
import { PostSummary } from '@/types/api';
import { sounds } from '@/lib/sounds';

interface PostCardProps {
  post: PostSummary;
  className?: string;
}

export function PostCard({ post, className = '' }: PostCardProps) {
  const readTime = post.readingTimeMinutes || post.readTimeMinutes || 5;
  const excerptText = post.excerpt || post.summary || '';
  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <article
      data-testid="article-card"
      className={`group relative glass rounded-3xl overflow-hidden flex flex-col border border-white/10 dark:border-white/10 light:border-zinc-200 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/10 smooth-transition hover:-translate-y-1.5 ${className}`}
      onMouseEnter={() => sounds.playData()}
    >
      {/* Imagem de Capa com Fallback */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-cyan-950/40 flex items-center justify-center p-6 text-center">
            <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
              [NerdLab//Lab_Module]
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

        {/* Badge de Categoria */}
        {post.category && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-cyan-400/40 text-cyan-400">
            {post.category}
          </span>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadados: Data e Tempo de Leitura */}
          <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
            {dateFormatted && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {dateFormatted}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {readTime} min de leitura
            </span>
          </div>

          {/* Título com Link */}
          <h2 className="text-xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-900 group-hover:text-cyan-400 transition-colors line-clamp-2">
            <Link href={`/posts/${post.slug}`} className="focus:outline-none focus:underline">
              {post.title}
            </Link>
          </h2>

          {/* Resumo */}
          <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-sm leading-relaxed line-clamp-3">
            {excerptText}
          </p>
        </div>

        {/* Footer do Card: Autor e Link de Acesso */}
        <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {post.author?.avatarUrl ? (
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10">
                <Image
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="text-xs font-medium text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
              {post.author?.name || 'Autor NerdLab'}
            </span>
          </div>

          <Link
            href={`/posts/${post.slug}`}
            className="w-8 h-8 rounded-full glass flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-cyan-400 transition-all duration-300"
            aria-label={`Ler artigo: ${post.title}`}
          >
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
