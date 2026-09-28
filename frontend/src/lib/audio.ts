export class SoundManager {
  private ctx: AudioContext | null = null;
  
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playClick() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(900, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playError() {
     if (!this.ctx) return;
     if (this.ctx.state === 'suspended') this.ctx.resume();
     const osc = this.ctx.createOscillator();
     const gain = this.ctx.createGain();
     osc.type = 'sawtooth';
     osc.frequency.setValueAtTime(120, this.ctx.currentTime);
     gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
     gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
     osc.connect(gain);
     gain.connect(this.ctx.destination);
     osc.start();
     osc.stop(this.ctx.currentTime + 0.3);
  }
}
export const soundManager = new SoundManager();
