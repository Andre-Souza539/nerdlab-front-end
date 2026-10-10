'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Youtube, Terminal, Shield } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export function Footer() {
  return (
    <footer className="bg-zinc-950/80 border-t border-white/5 py-16 mt-24">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Coluna 1: Marca & Manifesto */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-400 text-black font-black text-xs rounded-lg flex items-center justify-center">
              <span>NL</span>
            </div>
            <span className="font-black tracking-widest text-lg uppercase text-white font-display">
              NERDLAB
            </span>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-mono">
            Ecosystem de engenharia de software de alta fidelidade. Back-End resiliente em Java 21,
            Spring Boot 3 e Front-End contemporâneo em Next.js.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://github.com/Andre-Souza539"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400/50 transition-all"
              onMouseEnter={() => sounds.playBlip(1500, 0.01)}
              aria-label="GitHub do NerdLab"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400/50 transition-all"
              onMouseEnter={() => sounds.playBlip(1500, 0.01)}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400/50 transition-all"
              onMouseEnter={() => sounds.playBlip(1500, 0.01)}
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div className="space-y-4">
          <h4 className="font-bold text-xs tracking-widest uppercase text-zinc-400 font-mono flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Navegação
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-zinc-500">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className="hover:text-white transition-colors">
                Artigos & Tutoriais
              </Link>
            </li>
            <li>
              <Link href="/terminal" className="hover:text-white transition-colors">
                Terminal CLI
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                Dossier / Sobre
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Protocolo & Status */}
        <div className="space-y-4">
          <h4 className="font-bold text-xs tracking-widest uppercase text-zinc-400 font-mono flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            Status & API
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-zinc-500">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-zinc-400">API Core v2: Online</span>
            </li>
            <li>
              <a
                href="http://localhost:8080/swagger-ui/index.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                OpenAPI / Swagger
              </a>
            </li>
            <li>
              <span className="text-zinc-600">Next.js 16.2 Turbopack</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 mt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-xs font-mono gap-4">
        <p>© {new Date().getFullYear()} NerdLab. All rights reserved.</p>
        <p className="tracking-widest">BUILD_V2_SINGULARITY // HIGH_PERFORMANCE</p>
      </div>
    </footer>
  );
}
