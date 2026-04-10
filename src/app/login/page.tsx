'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Lock, User, RefreshCw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'login' | 'change-password'>('login');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, passwordChangeRequired } = response.data;
      
      localStorage.setItem('token', token);

      if (passwordChangeRequired) {
        setStep('change-password');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.patch('/api/v1/auth/change-password', { newPassword });
      router.push('/dashboard');
    } catch {
      setError('Erro ao mudar senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter">NERDLAB</h1>
          <p className="text-zinc-400 mt-2">Acesso administrativo</p>
        </div>

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
                <label className="text-sm font-medium text-zinc-400">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg"
                    placeholder="junca539"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : 'Entrar'}
                <ArrowRight className="w-4 h-4" />
              </button>
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
              <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg mb-6 text-sm">
                <p className="text-zinc-300 font-semibold mb-1">Primeiro Acesso Detectado</p>
                <p className="text-zinc-500">Por segurança, você deve alterar sua senha padrão antes de continuar.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Nova Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg"
                    placeholder="Nova senha segura"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : 'Salvar e Continuar'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
