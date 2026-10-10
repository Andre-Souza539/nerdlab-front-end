'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      sounds.playBlip(1800, 0.03);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar código:', err);
    }
  };

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-zinc-300 bg-zinc-950/90 dark:bg-zinc-950/90 light:bg-zinc-900 text-zinc-100 my-6 shadow-2xl font-mono text-xs md:text-sm ${className}`}
    >
      {/* Barra Superior do Bloco */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-white/5">
        <div className="flex items-center gap-2.5 text-zinc-400">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400/90">
            {language}
          </span>
          {filename && (
            <>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300 text-xs">{filename}</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Código copiado' : 'Copiar código'}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass text-[11px] uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Conteúdo do Código */}
      <div className="p-4 overflow-x-auto leading-relaxed">
        <pre className="m-0 p-0">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
