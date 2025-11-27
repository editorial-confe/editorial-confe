
// Advanced Synth for UI sounds using Web Audio API
// Optimized for Soothing / ASMR experience (Low volume, soft textures)

let audioCtx: AudioContext | null = null;
let isMuted = false;

// Global master volume adjustment - VERY LOW for subtlety
const MASTER_VOLUME = 0.08; 

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const getMuteState = () => isMuted;

export const toggleMute = () => {
  isMuted = !isMuted;
  return isMuted;
};

// Helper: Create Soft Noise Buffer (Pink-ish approximation)
const createSoftNoiseBuffer = () => {
  if (!audioCtx) return null;
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  
  // Pink noise approximation (softer than white noise)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11; // Validate within range
    b6 = white * 0.115926;
  }
  return buffer;
};

let noiseBuffer: AudioBuffer | null = null;

export const playSound = (type: 'pop' | 'click' | 'success' | 'magic' | 'paint' | 'eraser' | 'stamp' | 'woosh') => {
  initAudio();
  if (isMuted || !audioCtx) return;

  if (!noiseBuffer) noiseBuffer = createSoftNoiseBuffer();

  const t = audioCtx.currentTime;
  const gain = audioCtx.createGain();
  
  // Master limiter for this sound
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = MASTER_VOLUME;
  gain.connect(masterGain);
  masterGain.connect(audioCtx.destination);
  
  switch (type) {
    case 'paint': {
      // Texture: Soft Wax on Paper (Very subtle, mid-low freq)
      const src = audioCtx.createBufferSource();
      src.buffer = noiseBuffer;
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, t); // Lower frequency = softer sound
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.02); // Soft attack
      gain.gain.linearRampToValueAtTime(0, t + 0.12); // Soft release

      src.connect(filter);
      filter.connect(gain);
      src.start();
      src.stop(t + 0.15);
      break;
    }
    case 'eraser': {
      // Texture: Soft Rubber (Very low freq, almost a breath)
      const src = audioCtx.createBufferSource();
      src.buffer = noiseBuffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, t); // Very muffled
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.5, t + 0.05);
      gain.gain.linearRampToValueAtTime(0, t + 0.15);

      src.connect(filter);
      filter.connect(gain);
      src.start();
      src.stop(t + 0.2);
      break;
    }
    case 'stamp': {
      // Texture: Soft "Thump" (Cardboard hit)
      const osc = audioCtx.createOscillator();
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
      
      osc.connect(gain);
      osc.start();
      osc.stop(t + 0.12);
      break;
    }
    case 'woosh': {
       // Texture: Paper flip (Airy)
       const src = audioCtx.createBufferSource();
       src.buffer = noiseBuffer;
       const filter = audioCtx.createBiquadFilter();
       filter.type = 'bandpass';
       filter.frequency.setValueAtTime(400, t);
       
       gain.gain.setValueAtTime(0, t);
       gain.gain.linearRampToValueAtTime(0.1, t + 0.1);
       gain.gain.linearRampToValueAtTime(0, t + 0.25);
       
       src.connect(filter);
       filter.connect(gain);
       src.start();
       src.stop(t + 0.3);
       break;
    }
    case 'pop': {
      // Very short click for UI
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

      osc.connect(gain);
      osc.start();
      osc.stop(t + 0.06);
      break;
    }
    case 'click': {
      // Soft Wood block
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
      
      osc.connect(gain);
      osc.start();
      osc.stop(t + 0.05);
      break;
    }
    case 'success': {
      // Gentle Chimes (Sine waves)
      const freqs = [330, 415, 494, 659]; // E major chord
      freqs.forEach((f, i) => {
        const osc = audioCtx!.createOscillator();
        osc.type = 'sine'; 
        const g = audioCtx!.createGain();
        
        osc.frequency.setValueAtTime(f, t + i*0.08);
        
        g.gain.setValueAtTime(0, t + i*0.08);
        g.gain.linearRampToValueAtTime(0.1, t + i*0.08 + 0.05); // Fade in
        g.gain.exponentialRampToValueAtTime(0.01, t + i*0.08 + 1.2); // Long fade out
        
        osc.connect(g);
        g.connect(masterGain); 
        osc.start();
        osc.stop(t + i*0.08 + 1.5);
      });
      break;
    }
    case 'magic': {
       // Sparkles (High pitched random sines)
       [0, 50, 100].forEach((delay, i) => {
         const osc = audioCtx!.createOscillator();
         osc.type = 'sine';
         const g = audioCtx!.createGain();
         
         osc.frequency.setValueAtTime(880 + (i * 200), t + delay/1000);
         
         g.gain.setValueAtTime(0, t + delay/1000);
         g.gain.linearRampToValueAtTime(0.05, t + delay/1000 + 0.05);
         g.gain.exponentialRampToValueAtTime(0.01, t + delay/1000 + 0.3);
         
         osc.connect(g);
         g.connect(masterGain);
         osc.start();
         osc.stop(t + delay/1000 + 0.4);
       });
       break;
    }
  }
};

export const speakText = (text: string) => {
  if (isMuted) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Female') || v.name.includes('Monica') || v.name.includes('Paulina')));
    
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.lang = 'es-ES';
    utterance.rate = 0.9; 
    utterance.pitch = 1.1; 
    utterance.volume = 0.8; 
    window.speechSynthesis.speak(utterance);
  }
};
