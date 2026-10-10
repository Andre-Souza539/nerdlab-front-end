'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Laptop, Rocket, Zap, Terminal, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { sounds } from '@/lib/sounds';
import { useTextScramble } from '@/hooks/useTextScramble';
import MatrixRain from '@/components/MatrixRain';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PostCard } from '@/components/articles/PostCard';
import { MOCK_POSTS } from '@/services/mocks/posts.mock';

export default function Home() {
  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
  const scrambledHero = useTextScramble('Software de Elite.');

  const featuredPosts = MOCK_POSTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#131313] dark:bg-[#131313] light:bg-[#f8fafc] text-[#E5E2E1] dark:text-[#E5E2E1] light:text-[#09090b] overflow-x-hidden crt-flicker relative flex flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative pt-48 pb-16 text-center overflow-hidden w-full">
          <MatrixRain />

          <div className="max-w-6xl mx-auto px-6 space-y-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5" />
                <span>Plataforma Fullstack 2.0_SINGULARITY</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] uppercase font-display text-white dark:text-white light:text-zinc-900">
                Engenharia de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 via-white to-zinc-500">
                  {scrambledHero}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 dark:text-zinc-400 light:text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                Domine as tecnologias que as Big Techs usam. Do BackEnd Java de alta
                performance com Spring Boot 3 ao FrontEnd Next.js escalável.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/about"
                className="group h-14 px-8 bg-cyan-400 text-black rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 smooth-transition uppercase tracking-widest text-xs shadow-lg shadow-cyan-400/20"
                onMouseEnter={() => sounds.playData()}
              >
                View Dossier
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/posts"
                className="h-14 px-8 glass rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-all uppercase tracking-widest text-xs text-white dark:text-white light:text-zinc-900"
                onMouseEnter={() => sounds.playBlip()}
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Explorar Artigos
              </Link>
              <Link
                href="/terminal"
                className="h-14 px-8 glass rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-all uppercase tracking-widest text-xs text-zinc-400 hover:text-white"
                onMouseEnter={() => sounds.playBlip(900)}
              >
                <Terminal className="w-4 h-4 text-zinc-400" />
                Access Terminal
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Terminal className="w-7 h-7" />}
              title="Java 21 & Spring Boot 3"
              description="Arquitetura hexagonal, clean code, migrações determinísticas com Flyway e segurança com JWT."
              color="indigo"
            />
            <FeatureCard
              icon={<Laptop className="w-7 h-7" />}
              title="Next.js 16 Fullstack"
              description="Aplicações contemporâneas com App Router, Turbopack, Tailwind CSS e acessibilidade WCAG."
              color="purple"
            />
            <FeatureCard
              icon={<Rocket className="w-7 h-7" />}
              title="DevOps & Observabilidade"
              description="Deploy containerizado com Docker, testes automatizados e monitoramento distribuído."
              color="blue"
            />
          </div>
        </section>

        {/* Seção de Artigos em Destaque (US01) */}
        <section className="py-20 border-t border-white/5 dark:border-white/5 light:border-zinc-200">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publicações Recentes</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight text-white dark:text-white light:text-zinc-900">
                  Laboratórios & Artigos
                </h2>
              </div>
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 hover:text-cyan-300 font-bold"
              >
                Ver todos os artigos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="py-24 border-t border-white/5 dark:border-white/5 light:border-zinc-200 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass p-12 rounded-3xl space-y-6 relative overflow-hidden group">
              <h2 className="text-3xl font-black uppercase tracking-tight text-white dark:text-white light:text-zinc-900">
                NerdLab System Status
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 relative z-10">
                <Stat value="150+" label="Active_Nodes" />
                <Stat value="12" label="Core_Modules" />
                <Stat value="45+" label="GH_Protocols" />
                <Stat value="99.9%" label="Sync_Rate" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'indigo' | 'purple' | 'blue';
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colors: Record<string, string> = {
    indigo: 'text-cyan-400 group-hover:bg-cyan-500/10',
    purple: 'text-purple-400 group-hover:bg-purple-500/10',
    blue: 'text-blue-400 group-hover:bg-blue-500/10',
  };

  return (
    <div
      className="glow-card glass p-8 space-y-6 group cursor-default relative overflow-hidden rounded-3xl border border-white/10 dark:border-white/10 light:border-zinc-200"
      onMouseEnter={() => sounds.playData()}
    >
      <div
        className={`w-14 h-14 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-zinc-100 flex items-center justify-center border border-white/10 transition-colors ${colors[color]}`}
      >
        {icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-black tracking-tight uppercase font-display text-white dark:text-white light:text-zinc-900">
          {title}
        </h3>
        <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <div className="space-y-1">
      <div className="text-2xl md:text-3xl font-black text-white dark:text-white light:text-zinc-900 font-display">
        {value}
      </div>
      <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </div>
    </div>
  );
}
