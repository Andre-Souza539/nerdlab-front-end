'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchAndFilter } from '@/components/articles/SearchAndFilter';
import { ArticleList } from '@/components/articles/ArticleList';
import { postsService } from '@/services/postsService';
import { PostSummary } from '@/types/api';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PostsPage() {
  const [articles, setArticles] = useState<PostSummary[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Carrega categorias iniciais
  useEffect(() => {
    postsService.getTags().then(setCategories).catch(console.error);
  }, []);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await postsService.getPosts({
        search: searchTerm,
        tag: selectedCategory,
        page: 0,
        size: 20,
      });
      setArticles(response.content);
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className="min-h-screen flex flex-col bg-[#131313] dark:bg-[#131313] light:bg-[#f8fafc] text-[#E5E2E1] dark:text-[#E5E2E1] light:text-[#09090b]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-36 pb-20 space-y-12">
        {/* Header da Página */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>NerdLab Knowledge Base // v2</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-white dark:text-white light:text-zinc-900">
            Artigos & Laboratórios
          </h1>

          <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-base md:text-lg leading-relaxed">
            Tutoriais profundos sobre arquitetura de software, Java 21, Spring Boot 3,
            Next.js e práticas de engenharia de elite.
          </p>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <SearchAndFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSearch={setSearchTerm}
          onSelectCategory={setSelectedCategory}
        />

        {/* Lista de Artigos com Skeletons, Error e Empty State */}
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          isError={isError}
          onRetry={loadPosts}
        />
      </main>

      <Footer />
    </div>
  );
}
