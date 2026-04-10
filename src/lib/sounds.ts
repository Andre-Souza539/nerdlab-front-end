'use client';

class SoundManager {
  private audioContext: AudioContext | null = null;

  private initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Som de "Clique" tecnológico (agudo, curto, metálico)
  playTechClick(freq = 1200, duration = 0.03) {
    try {
      this.initContext();
      if (!this.audioContext) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      // Oscilador sawtooth para mais harmônicos (feeling tech)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.1, this.audioContext.currentTime + duration);

      // Filtro para tirar o "peso" e deixar apenas o estalo digital
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);

      gain.gain.setValueAtTime(0.04, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.error('Audio error:', e);
    }
  }

  // Som de processamento (sequência rápida de pulsos)
  playDataStream() {
    const now = Date.now();
    for(let i = 0; i < 3; i++) {
        setTimeout(() => {
            this.playTechClick(1800 + (i * 200), 0.02);
        }, i * 40);
    }
  }

  // Som de inicialização/sucesso (subida de tom)
  playBoot() {
    this.playTechClick(800, 0.1);
    setTimeout(() => this.playTechClick(1600, 0.05), 100);
  }

  // Shorthands para compatibilidade com os triggers atuais
  playBlip() {
    this.playTechClick(2200, 0.02);
  }

  playData() {
    this.playDataStream();
  }
}

export const sounds = typeof window !== 'undefined' ? new SoundManager() : {
  playBlip: () => {},
  playData: () => {},
  playTechClick: () => {},
  playDataStream: () => {},
  playBoot: () => {}
};
