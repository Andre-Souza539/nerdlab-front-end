'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Lock, User, RefreshCw, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '@/lib/sounds';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('admin@nerdlab.com');
  const [password, setPassword] = useState('admin123456');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'login' | 'change-password'>('login');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    sounds.playData();

    try {
      // O backend aceita login por email ou username
      const isEmail = identifier.includes('@');
      const payload = isEmail
        ? { email: identifier, password }
        : { username: identifier, password };

      const response = await api.post('/auth/login', payload);
      const { token, user } = response.data;

      localStorage.setItem('token', token);

      if (user?.passwordChangeRequired) {
        setStep('change-password');
      } else {
        setSuccessMsg(`Autenticado como ${user?.name || identifier}! Redirecionando...`);
        sounds.playBlip(1800, 0.03);
        setTimeout(() => {
          router.push('/posts');
        }, 1200);
      }
    } catch {
      setError('Credenciais inválidas. Verifique o email/username e a senha informados.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    sounds.playData();

    try {
      await api.patch('/auth/change-password', { newPassword });
      setSuccessMsg('Senha alterada com sucesso! Redirecionando...');
      sounds.playBlip(1800, 0.03);
      setTimeout(() => {
        router.push('/posts');
      }, 1200);
    } catch {
      setError('Erro ao alterar senha. A nova senha deve ter no mínimo 8 caracteres.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#131313] text-[#E5E2E1] relative overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass rounded-3xl p-8 space-y-8 border border-white/10 shadow-2xl relative z-10"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-cyan-400 text-black font-black text-sm rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-400/20 mb-4">
            <span>NL</span>
          </div>
          <h1 className="text-3xl font-black font-display tracking-tight text-white uppercase">
            NERDLAB AUTH
          </h1>
          <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
            Acesso Restrito // Cluster V2
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            {successMsg}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'login' ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Email ou Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    placeholder="admin@nerdlab.com ou admin"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 text-black font-black py-3.5 rounded-xl hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-widest mt-2"
              >
                {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : 'Autenticar'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] font-mono text-zinc-500">
                  Credencial Padrão Local: admin@nerdlab.com / admin123456
                </span>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="change"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleChangePassword}
              className="space-y-4"
            >
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-xs space-y-1">
                <p className="text-amber-400 font-bold">Primeiro Acesso Detectado</p>
                <p className="text-zinc-400">
                  Por segurança, redefina sua senha antes de acessar os painéis do sistema.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Nova Senha Segura
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    placeholder="Mínimo 8 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 text-black font-black py-3.5 rounded-xl hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-widest"
              >
                {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : 'Salvar Nova Senha'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
