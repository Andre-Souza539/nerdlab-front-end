'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AlertTriangle, Home, BookOpen } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#131313] text-[#E5E2E1]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-32 text-center">
        <div className="glass rounded-3xl p-12 max-w-lg w-full space-y-6 border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Erro 404 // Protocolo Não Encontrado
            </span>
            <h1 className="text-4xl font-black font-display uppercase tracking-tight text-white">
              Página Não Localizada
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              O recurso que você tentou acessar não existe, foi movido ou está temporariamente offline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              onClick={() => sounds.playData()}
              className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Voltar à Home
            </Link>
            <Link
              href="/posts"
              onClick={() => sounds.playBlip()}
              className="px-6 py-3 glass text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Explorar Artigos
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
