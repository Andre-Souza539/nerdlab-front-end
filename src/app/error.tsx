'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Falha capturada no Error Boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-[#131313] text-[#E5E2E1]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-32 text-center">
        <div className="glass rounded-3xl p-12 max-w-lg w-full space-y-6 border border-red-500/20 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400">
              Erro de Execução // Falha no Sistema
            </span>
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white">
              Ocorreu um Erro Inesperado
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              O aplicativo encontrou um problema ao renderizar esta página. Suas ações foram preservadas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={() => {
                sounds.playBlip();
                reset();
              }}
              className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar Novamente
            </button>
            <Link
              href="/"
              onClick={() => sounds.playData()}
              className="px-6 py-3 glass text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Ir para a Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
