// Web Audio API Synthesizer for live electronic preview and waveform data

class ElectronicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private loopInterval: number | null = null;
  private analyzerNode: AnalyserNode | null = null;
  private listeners: ((playing: boolean, trackId: string | null, freqData: Uint8Array) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyzerNode = this.ctx.createAnalyser();
      this.analyzerNode.fftSize = 64;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(callback: (playing: boolean, trackId: string | null, freqData: Uint8Array) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify() {
    const dataArray = new Uint8Array(this.analyzerNode ? this.analyzerNode.frequencyBinCount : 16);
    if (this.analyzerNode && this.isPlaying) {
      this.analyzerNode.getByteFrequencyData(dataArray);
    }
    this.listeners.forEach(cb => cb(this.isPlaying, this.currentTrackId, dataArray));
  }

  // Generate a punchy club kick drum
  private playKick(time: number) {
    if (!this.ctx || !this.analyzerNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.analyzerNode);
    this.analyzerNode.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  // Generate an Acid 303 bass synth stab
  private playAcidStab(time: number, freq: number = 110) {
    if (!this.ctx || !this.analyzerNode) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.Q.setValueAtTime(8, time);
    filter.frequency.setValueAtTime(300, time);
    filter.frequency.exponentialRampToValueAtTime(3200, time + 0.08);
    filter.frequency.exponentialRampToValueAtTime(400, time + 0.22);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.analyzerNode);
    this.analyzerNode.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.26);
  }

  // Generate crisp open hi-hat
  private playHiHat(time: number) {
    if (!this.ctx || !this.analyzerNode) return;
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.analyzerNode);
    this.analyzerNode.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.08);
  }

  public playTrackPreview(trackId: string, bpm: number = 138) {
    this.initContext();

    if (this.isPlaying && this.currentTrackId === trackId) {
      this.stop();
      return;
    }

    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;

    const stepDuration = (60 / bpm) / 4; // 16th notes
    let step = 0;

    const acidScale = [110, 130.81, 146.83, 164.81, 196, 220]; // D minor pentatonic

    const runBeat = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      // 4-on-the-floor kick
      if (step % 4 === 0) {
        this.playKick(now);
      }

      // Offbeat hi-hat
      if (step % 4 === 2) {
        this.playHiHat(now);
      }

      // Syncopated Acid notes
      if (step % 2 === 0 || step === 7 || step === 15) {
        const note = acidScale[(step * 3) % acidScale.length];
        this.playAcidStab(now, note);
      }

      step = (step + 1) % 16;
      this.notify();
    };

    // Run rhythm
    this.loopInterval = window.setInterval(runBeat, stepDuration * 1000);
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    this.notify();
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
    };
  }
}

export const audioEngine = new ElectronicAudioEngine();
