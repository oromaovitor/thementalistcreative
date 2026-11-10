"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CHARACTERS, type Character } from "@/lib/data";
import Portrait from "./Portrait";

type Edge = { a: string; b: string };
const EDGES: Edge[] = (() => {
  const seen = new Set<string>();
  const out: Edge[] = [];
  CHARACTERS.forEach((c) =>
    c.links.forEach((l) => {
      const k = [c.id, l.to].sort().join("-");
      if (!seen.has(k)) {
        seen.add(k);
        out.push({ a: c.id, b: l.to });
      }
    })
  );
  return out;
})();

const byId = Object.fromEntries(CHARACTERS.map((c) => [c.id, c])) as Record<string, Character>;

export default function EvidenceBoard() {
  const board = useRef<HTMLDivElement>(null);
  const cards = useRef<Record<string, HTMLButtonElement | null>>({});
  const panel = useRef<HTMLDivElement>(null);
  const [pts, setPts] = useState<Record<string, { x: number; y: number }>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [sel, setSel] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  const measure = useCallback(() => {
    const b = board.current;
    if (!b) return;
    const br = b.getBoundingClientRect();
    const next: Record<string, { x: number; y: number }> = {};
    Object.entries(cards.current).forEach(([id, el]) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next[id] = { x: r.left - br.left + r.width / 2, y: r.top - br.top + 14 };
    });
    setPts(next);
    setSize({ w: br.width, h: br.height });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (board.current) ro.observe(board.current);
    window.addEventListener("load", measure);
    document.fonts?.ready.then(measure);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setDrawn(true), { threshold: 0.2 });
    if (board.current) io.observe(board.current);
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  const choose = (id: string) => {
    setSel((s) => (s === id ? null : id));
    if (window.matchMedia("(max-width: 1023px)").matches) {
      window.setTimeout(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
    }
  };

  const related = new Set<string>(sel ? [sel, ...EDGES.filter((e) => e.a === sel || e.b === sel).flatMap((e) => [e.a, e.b])] : []);
  const c = sel ? byId[sel] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div
        ref={board}
        className="relative rounded-sm border border-[#3b2a20] bg-[#2a1c15] p-4 shadow-[inset_0_0_80px_rgba(0,0,0,.7)] sm:p-6 lg:h-[780px] lg:p-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,.25) 1px, transparent 1.5px), radial-gradient(rgba(255,220,170,.06) 1px, transparent 1.5px)",
          backgroundSize: "7px 7px, 11px 11px",
        }}
      >
        <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full" width={size.w} height={size.h} aria-hidden>
          {EDGES.map((e, i) => {
            const p = pts[e.a];
            const q = pts[e.b];
            if (!p || !q) return null;
            const on = sel && (e.a === sel || e.b === sel);
            const off = sel && !on;
            const mx = (p.x + q.x) / 2;
            const my = (p.y + q.y) / 2 + Math.min(60, Math.hypot(q.x - p.x, q.y - p.y) * 0.12);
            return (
              <path
                key={i}
                d={`M${p.x} ${p.y} Q${mx} ${my} ${q.x} ${q.y}`}
                fill="none"
                stroke={on ? "#d8263a" : "#9e1b26"}
                strokeWidth={on ? 2.6 : 1.6}
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawn ? 0 : 1,
                  opacity: off ? 0.12 : on ? 1 : 0.75,
                  filter: on ? "drop-shadow(0 0 4px rgba(216,38,58,.8))" : "none",
                  transition: `stroke-dashoffset 1.6s cubic-bezier(.23,1,.32,1) ${i * 90}ms, opacity .4s, stroke-width .3s`,
                }}
              />
            );
          })}
        </svg>

        <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:static lg:block">
          {CHARACTERS.map((ch) => {
            const dim = sel && !related.has(ch.id);
            return (
              <button
                key={ch.id}
                ref={(el) => {
                  cards.current[ch.id] = el;
                }}
                type="button"
                onClick={() => choose(ch.id)}
                aria-pressed={sel === ch.id}
                aria-label={`${ch.name}, ${ch.role}. Ver ficha`}
                className={`group relative z-20 mx-auto block w-full max-w-[11rem] transition-[opacity,transform,filter] duration-500 lg:absolute lg:w-[9.5rem] ${
                  dim ? "opacity-30 saturate-0" : "opacity-100"
                } ${sel === ch.id ? "lg:scale-110" : "hover:scale-[1.04]"}`}
                style={{
                  ["--x" as string]: `${ch.board.x}%`,
                  ["--y" as string]: `${ch.board.y}%`,
                  rotate: `${ch.board.r}deg`,
                }}
                data-board
              >
                <span
                  className={`absolute left-1/2 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full shadow-[0_2px_3px_rgba(0,0,0,.6)] ${ch.id === "redjohn" ? "bg-blood" : "bg-[#c9a76a]"}`}
                  style={sel === ch.id ? { animation: "pulse-pin 1.4s infinite" } : undefined}
                />
                <span className={`block p-2 pb-3 shadow-[0_14px_24px_-10px_rgba(0,0,0,.9)] ${ch.id === "redjohn" ? "bg-[#130b0c] ring-1 ring-blood/50" : "paper"}`}>
                  <Portrait c={ch} className="aspect-[4/5] w-full" />
                  <span className={`mt-2 block font-type text-[12px] leading-tight ${ch.id === "redjohn" ? "text-blood" : "text-[#2a1d1a]"}`}>{ch.name}</span>
                  <span className={`block text-[10.5px] leading-snug ${ch.id === "redjohn" ? "text-paper/50" : "text-[#5a4335]"}`}>{ch.actor}</span>
                </span>
              </button>
            );
          })}
        </div>
        <style>{`@media (min-width:1024px){[data-board]{left:calc(var(--x) * .86 + 7%);top:calc(var(--y) * .66 + 1%);translate:-50% 0}}`}</style>
      </div>

      <div ref={panel} className="lg:sticky lg:top-28 lg:self-start">
        {c ? (
          <article key={c.id} className="reveal in rounded-sm border border-gold/20 bg-coal p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="font-type text-xs text-gold">Ficha {String(CHARACTERS.indexOf(c) + 1).padStart(2, "0")}</p>
              <button type="button" onClick={() => setSel(null)} aria-label="Fechar ficha" className="press -m-2 grid h-11 w-11 place-items-center text-smoke hover:text-paper">
                <X size={18} />
              </button>
            </div>
            <h3 className={`mt-2 font-display text-4xl leading-none ${c.id === "redjohn" ? "text-blood" : "text-paper"}`}>{c.name}</h3>
            <p className="mt-2 text-sm text-smoke">
              {c.actor}, {c.seasons}
            </p>
            <p className="mt-1 text-sm text-gold-soft">{c.role}</p>
            <p className="mt-5 leading-relaxed text-paper/85">{c.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.traits.map((t) => (
                <span key={t} className="rounded-full border border-gold/25 px-3 py-1 text-xs text-gold-soft">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 font-type text-xs text-blood">Ligações no quadro</p>
            <ul className="mt-2 space-y-1">
              {c.links.map((l) => (
                <li key={l.to}>
                  <button type="button" onClick={() => setSel(l.to)} className="group flex w-full items-baseline justify-between gap-3 border-b border-gold/10 py-2 text-left">
                    <span className="text-paper group-hover:text-blood">{byId[l.to].name}</span>
                    <span className="text-right text-xs text-smoke">{l.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ) : (
          <div className="rounded-sm border border-dashed border-gold/25 p-6">
            <p className="font-display text-2xl italic text-paper">Escolha um rosto no quadro.</p>
            <p className="mt-3 text-sm leading-relaxed text-smoke">
              Toque em qualquer ficha para abrir o perfil. Os fios vermelhos mostram quem está ligado a quem, e acendem quando você seleciona alguém.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
