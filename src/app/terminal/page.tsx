'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalPage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'system:init',
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-cyan-400 font-bold">NerdLab Terminal v2.0.0 [Online]</p>
          <p>Digite <span className="text-white font-bold">help</span> para visualizar a lista de comandos suportados.</p>
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    sounds.playData();
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-cyan-400 font-bold mb-2">Comandos Disponíveis:</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block">help</span> Exibe esta listagem de ajuda</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block">ping</span> Testa o endpoint de integridade do cluster</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block">posts</span> Lista os principais artigos da base de conhecimento</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block">stack</span> Exibe a arquitetura e tecnologias do NerdLab</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block">whoami</span> Exibe a identidade do operador</p>
            <p><span className="text-emerald-400 font-mono w-28 inline-block">clear</span> Limpa a tela do terminal</p>
          </div>
        );
        break;

      case 'ping':
        output = (
          <div className="text-emerald-400 font-mono space-y-1">
            <p>PONG! [RTT &lt; 1ms]</p>
            <p className="text-xs text-zinc-500">Node: nerdlab-core-v2 // Cluster: local-dev // Status: 200 OK</p>
          </div>
        );
        break;

      case 'posts':
        output = (
          <div className="space-y-1.5 text-zinc-300">
            <p className="text-cyan-400 font-bold">Artigos em Destaque:</p>
            <p>1. Arquitetura Hexagonal no Spring Boot 3 [/posts/arquitetura-hexagonal-spring-boot]</p>
            <p>2. Next.js 16 com Turbopack: Performance e App Router [/posts/nextjs-16-turbopack-app-router]</p>
            <p>3. Autenticação Stateless com JWT e Spring Security 6 [/posts/seguranca-jwt-spring-boot-3]</p>
          </div>
        );
        break;

      case 'stack':
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-cyan-400 font-bold">NerdLab Core Stack:</p>
            <p>- Back-End: Java 21 LTS + Spring Boot 3.4.5 + Flyway + PostgreSQL / H2</p>
            <p>- Front-End: Next.js 16 + React 19 + Tailwind CSS 4 + Turbopack</p>
            <p>- Security: Stateless JWT (HMAC-SHA256) + BCrypt + CORS Guard</p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <p className="text-amber-400 font-mono">
            Operador anônimo // Nível de acesso: GUEST_DEVELOPER
          </p>
        );
        break;

      default:
        output = (
          <p className="text-red-400 font-mono">
            Comando não reconhecido: &quot;{cmd}&quot;. Digite &quot;help&quot; para instruções.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#131313] dark:bg-[#131313] light:bg-[#f8fafc] text-[#E5E2E1] dark:text-[#E5E2E1] light:text-[#09090b]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 pt-36 pb-20">
        <div className="rounded-3xl border border-white/10 glass bg-zinc-950/95 overflow-hidden shadow-2xl flex flex-col h-[600px] font-mono text-sm">
          {/* Header do Terminal */}
          <div className="px-6 py-4 bg-zinc-900 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                terminal@nerdlab:~
              </span>
            </div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
              SESSION_ACTIVE
            </span>
          </div>

          {/* Área de Histórico e Output */}
          <div
            className="flex-1 p-6 overflow-y-auto space-y-4"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-zinc-500">&gt;</span>
                  <span className="font-bold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Form de Entrada de Comando */}
          <form
            onSubmit={onSubmit}
            className="px-6 py-4 bg-zinc-900/60 border-t border-white/5 flex items-center gap-3"
          >
            <span className="text-cyan-400 font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite um comando (ex: help, ping, posts)..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-zinc-600 font-mono text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="p-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
              title="Executar comando"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
