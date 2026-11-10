"use client";
import { useEffect, useRef, useState } from "react";

// Relógio de bolso hipnótico. Se a pessoa fica parada olhando, ele fala.
export default function PocketWatch() {
  const ref = useRef<HTMLDivElement>(null);
  const [sleepy, setSleepy] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    let timer = 0;
    const arm = () => {
      window.clearTimeout(timer);
      setSleepy(false);
      if (visible) timer = window.setTimeout(() => setSleepy(true), 6500);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.intersectionRatio > 0.6;
      arm();
    }, { threshold: [0, 0.6, 1] });
    io.observe(el);
    const evs = ["scroll", "pointermove", "keydown", "touchstart"] as const;
    evs.forEach((ev) => window.addEventListener(ev, arm, { passive: true }));
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      evs.forEach((ev) => window.removeEventListener(ev, arm));
    };
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      <div className="swing" style={{ height: 300 }}>
        <svg viewBox="0 0 160 300" className="h-[300px] w-[160px]" aria-label="Relógio de bolso balançando" role="img">
          <defs>
            <radialGradient id="gold-face" cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor="#f0dfbf" />
              <stop offset="0.6" stopColor="#d8c09a" />
              <stop offset="1" stopColor="#8a6a40" />
            </radialGradient>
            <linearGradient id="gold-rim" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#e2c48e" />
              <stop offset="0.5" stopColor="#8f6c3c" />
              <stop offset="1" stopColor="#d8b77c" />
            </linearGradient>
          </defs>
          {/* corrente */}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={i} cx="80" cy={6 + i * 11} rx="3.2" ry="6" fill="none" stroke="#b39062" strokeWidth="1.6" transform={i % 2 ? "" : `rotate(90 80 ${6 + i * 11})`} />
          ))}
          <circle cx="80" cy="166" r="9" fill="none" stroke="url(#gold-rim)" strokeWidth="4" />
          <circle cx="80" cy="230" r="58" fill="url(#gold-rim)" />
          <circle cx="80" cy="230" r="50" fill="url(#gold-face)" stroke="#6b4f2c" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line key={i} x1={80 + Math.sin(a) * 41} y1={230 - Math.cos(a) * 41} x2={80 + Math.sin(a) * (i % 3 ? 45 : 47)} y2={230 - Math.cos(a) * (i % 3 ? 45 : 47)} stroke="#3a2a1a" strokeWidth={i % 3 ? 1 : 2} />
            );
          })}
          <g className="origin-[80px_230px] animate-[spin_60s_linear_infinite]">
            <line x1="80" y1="230" x2="80" y2="196" stroke="#2a1d14" strokeWidth="1.4" />
          </g>
          <line x1="80" y1="230" x2="99" y2="221" stroke="#2a1d14" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="80" y1="230" x2="80" y2="203" stroke="#9e1b26" strokeWidth="1.2" />
          <circle cx="80" cy="230" r="2.6" fill="#2a1d14" />
          <ellipse cx="62" cy="208" rx="18" ry="9" fill="#fff" opacity=".22" transform="rotate(-30 62 208)" />
        </svg>
      </div>
      <p
        aria-live="polite"
        className={`mt-4 h-6 font-display text-xl italic text-gold-soft transition-all duration-1000 ${sleepy ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-sm"}`}
      >
        …você está ficando com sono.
      </p>
    </div>
  );
}
