import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TableOfContents } from '@/components/articles/TableOfContents';
import { CodeBlock } from '@/components/articles/CodeBlock';
import { postsService } from '@/services/postsService';
import { Clock, Calendar, ArrowLeft, User, Tag } from 'lucide-react';
import { Metadata } from 'next';

interface PostDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await postsService.getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Artigo não encontrado | NerdLab',
    };
  }
  return {
    title: `${post.title} | NerdLab`,
    description: post.excerpt,
  };
}

// Renderizador simples de blocos de Markdown para exibir o conteúdo estruturado
function renderFormattedContent(rawContent: string) {
  const lines = rawContent.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = 'typescript';

  lines.forEach((line, index) => {
    // Detecta início ou fim de bloco de código
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // Fim do bloco
        elements.push(
          <CodeBlock
            key={`code-${index}`}
            code={codeBuffer.join('\n')}
            language={codeLang || 'plaintext'}
          />
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        // Início do bloco
        inCodeBlock = true;
        codeLang = line.trim().replace('```', '') || 'typescript';
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    const trimmed = line.trim();
    if (!trimmed) return;

    // Cabeçalho H2
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace('## ', '');
      const headingId = headingText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      elements.push(
        <h2
          key={`h2-${index}`}
          id={headingId}
          className="text-2xl md:text-3xl font-black font-display tracking-tight text-white dark:text-white light:text-zinc-900 mt-10 mb-4 pt-4 scroll-mt-28 border-b border-white/5 pb-2"
        >
          {headingText}
        </h2>
      );
      return;
    }

    // Cabeçalho H3
    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace('### ', '');
      elements.push(
        <h3
          key={`h3-${index}`}
          className="text-xl font-bold font-display tracking-tight text-cyan-400 mt-6 mb-3"
        >
          {headingText}
        </h3>
      );
      return;
    }

    // Listas com marcadores
    if (trimmed.startsWith('- ')) {
      elements.push(
        <li
          key={`li-${index}`}
          className="ml-6 list-disc text-zinc-300 dark:text-zinc-300 light:text-zinc-700 leading-relaxed my-1"
        >
          {trimmed.replace('- ', '')}
        </li>
      );
      return;
    }

    // Parágrafo comum
    elements.push(
      <p
        key={`p-${index}`}
        className="text-zinc-300 dark:text-zinc-300 light:text-zinc-700 text-base md:text-lg leading-relaxed my-4"
      >
        {trimmed}
      </p>
    );
  });

  return elements;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await postsService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-[#131313] dark:bg-[#131313] light:bg-[#f8fafc] text-[#E5E2E1] dark:text-[#E5E2E1] light:text-[#09090b]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-32 pb-24">
        {/* Breadcrumb e Retorno */}
        <div className="mb-8">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Artigos
          </Link>
        </div>

        {/* Header do Artigo */}
        <header className="space-y-6 max-w-4xl">
          {post.category && (
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
              {post.category}
            </span>
          )}

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white dark:text-white light:text-zinc-900 leading-[1.1]">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Metadados: Autor, Data, Tempo */}
          <div className="flex flex-wrap items-center gap-6 pt-2 pb-6 border-b border-white/10 dark:border-white/10 light:border-zinc-300 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              {post.author?.avatarUrl ? (
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div>
                <div className="font-bold text-white dark:text-white light:text-zinc-900">
                  {post.author?.name}
                </div>
                <div className="text-[10px] text-zinc-500">{post.author?.role}</div>
              </div>
            </div>

            {dateFormatted && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {dateFormatted}
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {post.readingTimeMinutes} min de leitura
            </span>
          </div>
        </header>

        {/* Imagem de Capa do Artigo */}
        {post.coverImage && (
          <div className="relative w-full h-[320px] md:h-[460px] rounded-3xl overflow-hidden my-10 border border-white/10 dark:border-white/10 light:border-zinc-200">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Grid com Corpo do Artigo e ToC Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          {/* Conteúdo Principal do Artigo */}
          <article className="lg:col-span-8 space-y-2">
            {renderFormattedContent(post.content)}

            {/* Tags do Artigo */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-10 mt-12 border-t border-white/10 dark:border-white/10 light:border-zinc-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 mr-2 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Tags:
                  </span>
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg glass text-xs font-mono text-zinc-300 dark:text-zinc-300 light:text-zinc-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sumário Lateral Interativo (Table of Contents) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <TableOfContents items={post.tableOfContents} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
