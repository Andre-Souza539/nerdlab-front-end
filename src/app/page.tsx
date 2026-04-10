'use client';

import { ArrowRight, Github, Laptop, Rocket, Zap, Youtube, Linkedin, Terminal } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { sounds } from '@/lib/sounds';
import { useTextScramble } from '@/hooks/useTextScramble';
import MatrixRain from '@/components/MatrixRain';

export default function Home() {
  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
  const scrambledHero = useTextScramble('Software de Elite.');

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden crt-flicker relative">
      <div className="hero-glow" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 py-6">
        <div className="max-w-5xl mx-auto glass rounded-2xl flex justify-between items-center px-6 py-4">
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            onMouseEnter={() => sounds.playBlip()}
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span className="text-black font-black text-sm">NL</span>
            </div>
            <span className="font-black tracking-tighter text-xl font-display uppercase tracking-widest">NERDLAB</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/about" 
              className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
              onMouseEnter={() => sounds.playBlip(1200)}
            >
              About
            </Link>
            <Link 
              href="#" 
              className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
              onMouseEnter={() => sounds.playBlip(1100)}
            >
              Projects
            </Link>
            <Link 
              href="#" 
              className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
              onMouseEnter={() => sounds.playBlip(1000)}
            >
              Lab
            </Link>
            <Link 
              href="/login" 
              className="px-5 py-2.5 bg-white text-black rounded-xl font-black text-xs hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
              onMouseEnter={() => sounds.playData()}
            >
              Auth
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="relative pt-64 pb-8 text-center overflow-hidden w-full">
          <MatrixRain />
          
          <div className="max-w-6xl mx-auto px-6 space-y-10 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="space-y-6"
            >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              <span>Plataforma Fullstack 2.0_SINGULARITY</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] uppercase font-display">
              Engenharia de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                {scrambledHero}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Domine as tecnologias que as Big Techs usam. Do BackEnd Java de alta 
              performance ao FrontEnd Next.js escalável.
            </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link 
                href="/about" 
                className="group h-14 px-10 bg-primary text-black rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 smooth-transition uppercase tracking-widest text-xs bloom"
                onMouseEnter={() => sounds.playData()}
              >
                View Dossier
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#" 
                className="h-14 px-10 glass rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                onMouseEnter={() => sounds.playBlip()}
              >
                Access Terminal
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 mt-24">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Terminal className="w-7 h-7" />}
              title="Java & Spring Boot"
              description="Arquitetura hexagonal, clean code e performance no coração do seu sistema."
              color="indigo"
            />
            <FeatureCard 
              icon={<Laptop className="w-7 h-7" />}
              title="Next.js Fullstack"
              description="Aplicações modernas, rápidas e otimizadas para SEO com as últimas verões do React."
              color="purple"
            />
            <FeatureCard 
              icon={<Rocket className="w-7 h-7" />}
              title="DevOps & Cloud"
              description="Deploy escalável com Docker, CI/CD e monitoramento em tempo real."
              color="blue"
            />
          </div>
        </section>

        {/* Status/Trust Section */}
        <section className="py-32 border-t border-white/5 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass p-12 rounded-3xl space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 smooth-transition" />
              <h2 className="text-3xl font-black uppercase tracking-tighter">Nerdlab System Status</h2>
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

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-20 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">NL</span>
              </div>
              <span className="font-black tracking-tighter text-xl uppercase tracking-widest">NERDLAB</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed lowercase font-mono">
              The ultimate ecosystem for elite engineers seeking global technical mastery.
              building_the_singularity.v2.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Youtube className="w-5 h-5" />} />
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-sm tracking-widest uppercase text-zinc-600 font-mono">Network</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500 lowercase font-mono">
              <li><Link href="#" onMouseEnter={() => sounds.playBlip()} className="hover:text-white transition-colors text-[10px]">Archives</Link></li>
              <li><Link href="#" onMouseEnter={() => sounds.playBlip()} className="hover:text-white transition-colors text-[10px]">Research</Link></li>
              <li><Link href="#" onMouseEnter={() => sounds.playBlip()} className="hover:text-white transition-colors text-[10px]">Lab</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-sm tracking-widest uppercase text-zinc-600 font-mono">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500 lowercase font-mono">
              <li><Link href="#" onMouseEnter={() => sounds.playBlip()} className="hover:text-white transition-colors text-[10px]">Protocol</Link></li>
              <li><Link href="#" onMouseEnter={() => sounds.playBlip()} className="hover:text-white transition-colors text-[10px]">Privacy</Link></li>
              <li><Link href="#" onMouseEnter={() => sounds.playBlip()} className="hover:text-white transition-colors text-[10px]">System</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-12 mt-12 border-t border-white/5 text-center">
          <p className="text-zinc-600 text-xs font-mono lowercase tracking-[0.3em] opacity-40">
            © {new Date().getFullYear()} nerdlab.protocol // build_singularity
          </p>
        </div>
      </footer>
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
    indigo: "text-indigo-400 group-hover:bg-indigo-500/10",
    purple: "text-purple-400 group-hover:bg-purple-500/10",
    blue: "text-blue-400 group-hover:bg-blue-500/10"
  };

  return (
    <div 
      className="glow-card glass p-8 space-y-6 group cursor-default relative overflow-hidden"
      onMouseEnter={() => sounds.playData()}
    >
      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-colors ${colors[color]}`}>
        {icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-black tracking-tight uppercase font-display">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
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
      <div className="text-2xl md:text-3xl font-black text-white font-display">{value}</div>
      <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">{label}</div>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <Link 
      href={href} 
      className="w-11 h-11 rounded-xl glass flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
      onMouseEnter={() => sounds.playBlip(1500, 0.01)}
    >
      {icon}
    </Link>
  );
}
