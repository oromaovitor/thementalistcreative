"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ColdRead from "./ColdRead";

const CLUES = [
  { t: "a xícara de chá ainda morna", x: 8, y: 13, r: -6 },
  { t: "ninguém mente com os ombros", x: 58, y: 9, r: 4 },
  { t: "sapato engraxado, unha roída", x: 52, y: 22, r: -3 },
  { t: "ele olhou para a porta duas vezes", x: 6, y: 27, r: 5 },
  { t: "o relógio parou às 3h17", x: 70, y: 70, r: -2 },
  { t: "SACRAMENTO, CBI", x: 40, y: 38, r: -1 },
  { t: "quem tem pressa esconde algo", x: 78, y: 46, r: 7 },
];

export default function FlashlightHero() {
  const root = useRef<HTMLElement>(null);
  const [hint, setHint] = useState(true);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    let tx = 0.5, ty = 0.42, x = tx, y = ty;
    let lastMove = 0;
    let raf = 0;
    let visible = true;
    const set = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      tx = (cx - r.left) / r.width;
      ty = (cy - r.top) / r.height;
      lastMove = performance.now();
      setHint(false);
    };
    const pm = (e: PointerEvent) => set(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => e.touches[0] && set(e.touches[0].clientX, e.touches[0].clientY);
    el.addEventListener("pointermove", pm);
    el.addEventListener("pointerdown", pm);
    el.addEventListener("touchmove", tm, { passive: true });

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const loop = (t: number) => {
      if (visible) {
        if (!reduce && t - lastMove > 2600) {
          // sem interação: a luz vaga sozinha, procurando pistas
          tx = 0.5 + Math.sin(t / 2300) * 0.32;
          ty = 0.48 + Math.sin(t / 1700 + 1) * 0.24;
        }
        x += (tx - x) * 0.09;
        y += (ty - y) * 0.09;
        el.style.setProperty("--lx", `${(x * 100).toFixed(2)}%`);
        el.style.setProperty("--ly", `${(y * 100).toFixed(2)}%`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", pm);
      el.removeEventListener("pointerdown", pm);
      el.removeEventListener("touchmove", tm);
    };
  }, []);

  return (
    <section
      ref={root}
      data-thread="Abertura"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
      style={{ touchAction: "pan-y", ["--lx" as string]: "50%", ["--ly" as string]: "42%" }}
    >
      {/* Cena escondida no escuro */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(80%_60%_at_50%_40%,#3d0d14_0%,#1b1012_55%,#0c0809_100%)]">
        <div className="absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(0deg,transparent_0_38px,rgba(216,192,154,.5)_38px_39px),repeating-linear-gradient(90deg,transparent_0_38px,rgba(216,192,154,.5)_38px_39px)]" />
        {CLUES.map((c, i) => (
          <span
            key={i}
            className={`absolute font-type text-xs text-gold-soft sm:text-base ${i > 3 ? "hidden sm:block" : ""}`}
            style={{ left: `${c.x}%`, top: `${c.y}%`, transform: `rotate(${c.r}deg)`, maxWidth: "42vw" }}
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blood align-middle" />
            {c.t}
          </span>
        ))}
        <svg className="absolute left-[30%] top-[46%] h-40 w-72 text-blood/80 sm:h-56 sm:w-96" viewBox="0 0 300 160" fill="none" stroke="currentColor" strokeWidth="1.6">
          <ellipse cx="150" cy="80" rx="135" ry="62" transform="rotate(-4 150 80)" />
          <path d="M20 40 C 90 10, 210 150, 290 110" strokeDasharray="4 6" />
        </svg>
      </div>

      {/* Escuridão com o círculo da lanterna */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#070505]"
        style={{
          WebkitMaskImage: "radial-gradient(circle var(--lr, 210px) at var(--lx) var(--ly), transparent 0%, rgba(0,0,0,.55) 55%, #000 100%)",
          maskImage: "radial-gradient(circle var(--lr, 210px) at var(--lx) var(--ly), transparent 0%, rgba(0,0,0,.55) 55%, #000 100%)",
        }}
      />
      <div aria-hidden className="vignette pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-gradient-to-t from-[#070505] via-[#070505]/80 to-transparent lg:h-[45%]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-28 sm:pb-20 lg:px-10 lg:pb-24">
        <p className="reveal font-type text-xs text-gold" style={{ ["--d" as string]: "100ms" }}>
          Arquivo nº 151, CBS, 2008 a 2015
        </p>
        <h1 className="reveal mt-4 font-display text-[clamp(3.4rem,13vw,10.5rem)] leading-[0.86] tracking-[-0.02em] text-paper" style={{ ["--d" as string]: "200ms" }}>
          The <span className="italic">Mentalist</span>
        </h1>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
          <div className="reveal max-w-xl" style={{ ["--d" as string]: "400ms" }}>
            <p className="text-lg leading-relaxed text-paper/85 sm:text-xl">
              Um dossiê sobre a série de Bruno Heller. Um falso vidente, uma equipe de investigação na Califórnia e um assassino que nunca mostra o rosto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sobre/" className="press inline-flex h-12 items-center rounded-full bg-blood px-6 text-sm font-medium text-paper transition-colors duration-200 hover:bg-[#b3212d]">
                Abrir o dossiê
              </Link>
              <Link href="/red-john/" className="press inline-flex h-12 items-center rounded-full border border-paper/25 px-6 text-sm text-paper transition-colors duration-200 hover:border-blood hover:text-blood">
                Ir atrás de Red John
              </Link>
            </div>
          </div>
          <div className="reveal rounded-sm border border-gold/20 bg-ink/70 p-5 backdrop-blur-sm" style={{ ["--d" as string]: "600ms" }}>
            <p className="mb-3 font-type text-[11px] text-blood">Leitura fria do visitante</p>
            <ColdRead />
          </div>
        </div>
        <p
          aria-hidden
          className={`pointer-events-none mt-10 font-type text-[11px] text-smoke transition-opacity duration-700 ${hint ? "opacity-100" : "opacity-0"}`}
        >
          {touch ? "Arraste o dedo para iluminar a cena." : "Mova o cursor para iluminar a cena."}
        </p>
      </div>
    </section>
  );
}
