// Som ambiente gerado no próprio navegador (sem arquivos de áudio):
// chuva, um relógio batendo e um grave baixo. Começa sempre desligado.

type Engine = { ctx: AudioContext; master: GainNode; stop: () => void };
let engine: Engine | null = null;
const listeners = new Set<(on: boolean) => void>();

function build(): Engine {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Chuva: ruído filtrado
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5 + white * 0.08;
  }
  const rain = ctx.createBufferSource();
  rain.buffer = buf;
  rain.loop = true;
  const rainFilter = ctx.createBiquadFilter();
  rainFilter.type = "lowpass";
  rainFilter.frequency.value = 1400;
  const rainGain = ctx.createGain();
  rainGain.gain.value = 0.35;
  rain.connect(rainFilter).connect(rainGain).connect(master);
  rain.start();

  // Grave: duas senoides levemente desafinadas
  const drone = ctx.createGain();
  drone.gain.value = 0.09;
  drone.connect(master);
  const oscs = [55, 55.6, 82.4].map((f) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.connect(drone);
    o.start();
    return o;
  });
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 0.05;
  lfo.connect(lfoGain).connect(drone.gain);
  lfo.start();

  // Relógio: um "tic" por segundo, alternando timbre
  let n = 0;
  const tick = () => {
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = n++ % 2 ? 1800 : 2300;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 900;
    o.connect(hp).connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.05);
  };
  const timer = window.setInterval(tick, 1000);

  return {
    ctx,
    master,
    stop: () => {
      window.clearInterval(timer);
      rain.stop();
      oscs.forEach((o) => o.stop());
      lfo.stop();
      ctx.close();
    },
  };
}

export function isSoundOn() {
  return !!engine;
}

export function setSound(on: boolean) {
  if (on && !engine) {
    engine = build();
    const { ctx, master } = engine;
    master.gain.setTargetAtTime(0.55, ctx.currentTime, 0.8);
  } else if (!on && engine) {
    const e = engine;
    engine = null;
    e.master.gain.setTargetAtTime(0, e.ctx.currentTime, 0.25);
    window.setTimeout(() => e.stop(), 900);
  }
  listeners.forEach((l) => l(on));
}

export function onSound(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
