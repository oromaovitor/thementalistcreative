"use client";
import { useEffect, useState } from "react";

// Tinta vermelha escorre pela tela a cada troca de página e se dissolve.
let firstLoad = true;

const COLS = 26;
const cols = Array.from({ length: COLS }, (_, i) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  const r = s - Math.floor(s);
  const thin = i % 3 === 1;
  return {
    delay: Math.round(r * 300),
    len: thin ? 18 + Math.round(((r * 5) % 1) * 30) : 10 + Math.round(((r * 7) % 1) * 70),
    w: thin ? 0.35 : 0.8 + ((r * 3) % 1) * 1.4,
  };
});

export default function InkTransition() {
  const [phase, setPhase] = useState<"idle" | "run" | "out">("idle");
  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("run");
    const a = window.setTimeout(() => setPhase("out"), 720);
    const b = window.setTimeout(() => setPhase("idle"), 1500);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);
  if (phase === "idle") return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "out" ? "translateY(12%)" : "none",
        transition: "opacity .75s cubic-bezier(.23,1,.32,1), transform .75s cubic-bezier(.23,1,.32,1)",
      }}
    >
      <svg width="0" height="0" className="absolute">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
        </filter>
      </svg>
      <div className="flex h-full w-full items-start" style={{ filter: "url(#goo)" }}>
        <span className="absolute inset-x-0 top-0 block h-[7vh] origin-top bg-[#8f1a24]" style={{ animation: "ink-drop .35s cubic-bezier(.6,.04,.3,1) both" }} />
        {cols.map((c, i) => (
          <span key={i} className="relative block" style={{ flex: c.w, height: `${c.len + 7}vh` }}>
            <span
              className="absolute inset-x-[8%] top-0 bottom-0 origin-top rounded-b-full bg-[#8f1a24]"
              style={{ animation: `ink-drop .75s ${c.delay}ms cubic-bezier(.6,.04,.3,1) both` }}
            />
          </span>
        ))}
      </div>
      <style>{`@keyframes ink-drop{from{transform:scaleY(0)}to{transform:scaleY(1)}}`}</style>
    </div>
  );
}
