'use client';

import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { sounds } from '@/lib/sounds';
import { useTextScramble } from '@/hooks/useTextScramble';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
  const scrambledName = useTextScramble('André Luiz Junqueira de Souza');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      '> [SYSTEM] INITIALIZING Dossier_Alpha_v2',
      '> [AUTH] Identity Verified: André Souza',
      '> [DATA] Loading Software Engineering Core...',
      '> [DATA] Fetching Santander_Exp... [OK]',
      '> [DATA] Camunda_8 Connectors... [OK]',
      '> [SINGULARITY] Ready'
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLogs(prev => [...prev.slice(-4), messages[i]]);
        sounds.playBlip(1200, 0.02);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen crt-flicker">
      {/* Sound Toggle / Status Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/20 z-[100]" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <Link 
            href="/" 
            className="flex items-center gap-4 group"
            onMouseEnter={() => sounds.playBlip()}
          >
            <div className="w-12 h-12 bg-white rounded-xs flex items-center justify-center group-hover:rotate-90 smooth-transition">
              <span className="text-black font-black text-sm">NL</span>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-bold tracking-tighter text-xl font-display uppercase tracking-widest">NERDLAB</span>
              <span className="label-md opacity-50 text-[10px] lowercase">dossier_v2.0.4</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-12 glass px-8 py-3 rounded-full">
            <Link href="/" onMouseEnter={() => sounds.playBlip()} className="label-md hover:text-primary smooth-transition">Home</Link>
            <div className="w-px h-4 bg-white/10 mx-2" />
            <Link href="#" onMouseEnter={() => sounds.playBlip()} className="label-md hover:text-primary smooth-transition">Archives</Link>
            <Link href="#" onMouseEnter={() => sounds.playBlip()} className="label-md hover:text-primary smooth-transition">Protocols</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Biography Header */}
        <section className="relative pt-64 pb-20 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={transition}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-primary/40" />
                  <span className="label-md text-primary tracking-[0.3em]">Engineering Dossier // SPECIALIST</span>
                </div>
                <h1 className="display-lg font-black tracking-tighter uppercase leading-none crt-flicker">
                  {scrambledName}
                </h1>
                <p className="label-md text-zinc-500 max-w-md normal-case italic">
                  Software Engineer | Java & Spring Boot Specialist | Founder of Nerdlab
                </p>
              </motion.div>

              {/* System Stats Terminal */}
              <div className="bg-surface-container-lowest glass p-6 rounded-xs space-y-3 font-mono text-[10px] text-zinc-500 max-w-sm border-primary/10">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-primary font-bold">SYSTEM_LOG</span>
                  <span>v2.04_READY</span>
                </div>
                <div className="space-y-1">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                      <span className={log?.includes('[OK]') || log?.includes('Ready') ? 'text-primary' : ''}>
                        {log || ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
                className="space-y-8 max-w-2xl"
              >
                <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-300">A Missão & Identidade</h3>
                <p className="text-xl text-zinc-400 leading-relaxed font-body">
                  André Souza é um engenheiro de software de elite com foco em <span className="text-primary italic">escalabilidade e automação</span> de alta complexidade. 
                  Arquitetou soluções críticas para o setor financeiro, aliando o rigor técnico à paixão pela educação tecnológica. 
                  Sua missão é fundir arquiteturas robustas (<span className="text-white italic">Clean Code</span>) com o desenvolvimento colaborativo.
                </p>
              </motion.div>
            </div>

            <div className="hidden lg:block lg:col-span-4 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute -right-16 top-0 w-[450px] h-[600px] glass grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group shadow-2xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
                <div className="text-primary/10 font-black text-9xl absolute -bottom-10 -right-10 select-none group-hover:text-primary/20 transition-colors z-20">NL</div>
                <Image 
                  src="/img/andrew-picture.png" 
                  alt="André Souza - Engineering Dossier"
                  fill
                  className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 smooth-transition"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Arsenal - Blueprint Section */}
        <section className="bg-surface-container-low py-40 px-8 signature-border relative overflow-hidden">
          {/* Background Pulse Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none animate-pulse opacity-50" />
          
          <div className="max-w-7xl mx-auto space-y-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-12">
                <span className="label-md">01 // ARSENAL TÉCNICO</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mt-4">
                  Tech Stack <br /><span className="text-primary italic">Core Sovereignty</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <ArsenalSection 
                title="Linguagens de Domínio"
                tags={["Java (Mastery)", "Node.js", "PHP", "JavaScript"]}
              />
              <ArsenalSection 
                title="Arquitetura & Frameworks"
                tags={["Spring Boot", "Camunda 8 (Specialist)", "Hexagonal Architecture", "REST APIs"]}
              />
              <ArsenalSection 
                title="Dados & Persistência"
                tags={["Oracle PL/SQL", "PostgreSQL", "MySQL"]}
              />
              <ArsenalSection 
                title="Operação & Cloud"
                tags={["Docker", "CI/CD Pipelines", "Git/GitHub"]}
              />
            </div>
          </div>
        </section>

        {/* Journey - Tonal Shift Narrative */}
        <section className="py-40 px-8 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
            <div className="lg:col-span-4 sticky top-64 h-fit">
              <span className="label-md opacity-30">02 // CARREIRA</span>
              <h2 className="text-4xl font-black tracking-tighter uppercase mt-4">A Jornada do <br /> Especialista</h2>
              <div className="mt-8 space-y-2">
                <div className="label-md text-[10px] uppercase text-zinc-600">Base: São Paulo, SP</div>
                <div className="label-md text-[10px] uppercase text-zinc-600">Status: Active Engineering</div>
              </div>
            </div>
            
            <div className="lg:col-span-8 space-y-32">
              <ExperienceItem 
                period="PRESENTE // ENGENHARIA DE ELITE"
                company="Santander (via Qaracter)"
                role="Software Engineer Specialist"
                desc="Atuação na vanguarda do setor financeiro, desenvolvendo APIs RESTful escaláveis. Maestria em Camunda 8, projetando conectores personalizados para orquestrar microsserviços complexos e superar limitações padrão em ciclos ágeis internacionais."
              />
              <ExperienceItem 
                period="FOUNDATION // INFRAESTRUTURA"
                company="Enterprise IT Systems"
                role="Infrastrucure & Support Specialist"
                desc="Background sólido em infraestrutura de TI e suporte crítico. Visão 360º de sistemas, desde servidores Windows até redes de larga escala, garantindo que o código rode sobre infraestruturas robustas."
              />
              <ExperienceItem 
                period="ACADEMIC // ADS"
                company="Faculdade Descomplica"
                role="Análise e Desenvolvimento de Sistemas"
                desc="Formação acadêmica focada na base teórica necessária para sustentar a prática de engenharia de alta performance."
              />
            </div>
          </div>
        </section>

        {/* Projects Dossier - Solution Focused */}
        <section className="bg-surface-container-lowest py-40 px-8 signature-border">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center md:text-left">
              <span className="label-md">03 // PROJETOS SELECIONADOS</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mt-4">Dossier <br /> <span className="text-primary italic">Archives</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <DossierCard 
                title="ERP Byte Company"
                type="Management / Scale"
                desc="Sistemas CRUD completo e responsivo para gestão de clientes, orquestrado para suportar fluxos comerciais fluidos."
              />
              <DossierCard 
                title="Hexagonal Order System"
                type="Architectural Study"
                desc="Um estudo profundo sobre separação de interesses, desacoplamento e portabilidade de lógica de negócio."
              />
              <DossierCard 
                title="Banking Simulation"
                type="POO Precision"
                desc="Aplicação rigorosa de Princípios de POO (Abstração, Herança) para simular processos financeiros de alta fidelidade."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-32 px-8 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="text-2xl font-black tracking-tighter font-display uppercase italic text-primary">André Souza.</div>
            <p className="label-md mt-2 lowercase opacity-50 tracking-widest font-mono">software.engineer_specialist.v2</p>
          </div>
          
          <div className="flex gap-8">
            <Link href="#" onMouseEnter={() => sounds.playBlip()} className="label-md hover:text-primary smooth-transition">Contact</Link>
            <Link href="#" onMouseEnter={() => sounds.playBlip()} className="label-md hover:text-primary smooth-transition">LinkedIn</Link>
            <Link href="#" onMouseEnter={() => sounds.playBlip()} className="label-md hover:text-primary smooth-transition">GitHub</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8">
          <span className="label-md opacity-30 italic font-mono lowercase">© 2024 nerdlab.protocol // build_singularity</span>
          <span className="label-md opacity-30 lowercase font-mono">São Paulo_SP // Brazil</span>
        </div>
      </footer>
    </div>
  );
}

interface ArsenalSectionProps {
  title: string;
  tags: string[];
}

function ArsenalSection({ title, tags }: ArsenalSectionProps) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-black uppercase tracking-tight text-white/90">{title}</h4>
      <div className="flex flex-col gap-3">
        {tags.map((tag: string) => (
          <div 
            key={tag} 
            className="flex items-center gap-3 group cursor-pointer"
            onMouseEnter={() => {
              sounds.playBlip(1200, 0.01);
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full border border-primary/40 group-hover:bg-primary smooth-transition" />
            <span className="label-md lowercase text-zinc-500 group-hover:text-white transition-colors">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ExperienceItemProps {
  period: string;
  company: string;
  role: string;
  desc: string;
}

function ExperienceItem({ period, company, role, desc }: ExperienceItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6 group"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="label-md text-primary/80 font-black">{period}</span>
          <h4 className="text-3xl font-black uppercase tracking-tighter mt-1">{company}</h4>
          <p className="label-md mt-1 italic text-zinc-500 lowercase">{role}</p>
        </div>
      </div>
      <p className="text-lg text-zinc-400 leading-relaxed font-body max-w-2xl">
        {desc}
      </p>
    </motion.div>
  );
}

interface DossierCardProps {
  title: string;
  type: string;
  desc: string;
}

function DossierCard({ title, type, desc }: DossierCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onMouseEnter={() => sounds.playData()}
      className="glass p-10 space-y-6 group hover:border-primary/40 smooth-transition cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 smooth-transition">
        <Zap className="w-12 h-12 text-primary" />
      </div>
      <div className="label-md text-secondary tracking-widest">{type}</div>
      <h3 className="text-3xl font-black uppercase tracking-tighter">{title}</h3>
      <p className="text-zinc-500 leading-relaxed sm:text-sm">{desc}</p>
      <div className="pt-4 flex items-center gap-2 label-md text-primary opacity-0 group-hover:opacity-100 transition-all font-mono uppercase text-[10px]">
        Inspect_Dossier_Archive <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}


