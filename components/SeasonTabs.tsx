"use client";
import { useRef, useState } from "react";
import { SEASONS } from "@/lib/data";
import Spoiler from "./Spoiler";

export default function SeasonTabs() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SEASONS[i];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : SEASONS.length - 1)) % SEASONS.length;
    setI(n);
    tabs.current[n]?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label="Temporadas" onKeyDown={onKey} className="-mx-6 flex snap-x scroll-px-6 gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:px-0">
        {SEASONS.map((x, k) => (
          <button
            key={x.n}
            ref={(el) => {
              tabs.current[k] = el;
            }}
            role="tab"
            id={`tab-${x.n}`}
            aria-selected={k === i}
            aria-controls="painel-temporada"
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            className={`press relative min-w-[5.5rem] shrink-0 snap-start rounded-sm border px-4 py-3 text-left transition-colors duration-300 ${
              k === i ? "border-blood bg-blood/15 text-paper" : "border-gold/15 text-smoke hover:border-gold/40 hover:text-paper"
            }`}
          >
            <span className="block font-display text-2xl leading-none">{x.n}ª</span>
            <span className="mt-1 block font-type text-[10px]">{x.years}</span>
          </button>
        ))}
      </div>

      <div
        id="painel-temporada"
        role="tabpanel"
        aria-labelledby={`tab-${s.n}`}
        className="relative mt-8 overflow-hidden rounded-sm border border-gold/15 bg-coal/60"
      >
        <span
          key={`n-${s.n}`}
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[clamp(14rem,38vw,26rem)] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(179,144,98,.22)] animate-[fadein_.8s_cubic-bezier(.23,1,.32,1)]"
        >
          {String(s.n).padStart(2, "0")}
        </span>
        <div key={s.n} className="relative grid gap-10 p-6 animate-[fadein_.7s_cubic-bezier(.23,1,.32,1)] sm:p-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <p className="font-type text-xs text-gold">
              Temporada {s.n}, {s.years}
            </p>
            <h3 className="mt-3 font-display text-5xl leading-none text-paper sm:text-6xl">{s.title}</h3>
            <p className="mt-3 text-gold-soft">{s.focus}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">{s.synopsis}</p>
            {s.spoiler && (
              <div className="mt-6 max-w-2xl border-l-2 border-blood/60 pl-4 text-paper/85">
                <Spoiler key={s.n} label="Ver como termina">
                  {s.spoiler}
                </Spoiler>
              </div>
            )}
          </div>
          <aside className="space-y-6">
            <div>
              <p className="font-type text-xs text-smoke">Episódios</p>
              <p className="font-display text-6xl leading-none text-paper">{s.episodes}</p>
              <div className="mt-3 flex flex-wrap gap-[3px]" aria-hidden>
                {Array.from({ length: s.episodes }).map((_, k) => (
                  <span key={k} className="h-3 w-1.5 bg-blood/80" style={{ opacity: 0.45 + (k / s.episodes) * 0.55 }} />
                ))}
              </div>
            </div>
            <div>
              <p className="font-type text-xs text-smoke">Marcos</p>
              <ul className="mt-2 space-y-2">
                {s.moments.map((m) => (
                  <li key={m} className="flex gap-3 text-sm leading-snug text-paper/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blood" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <style>{`@keyframes fadein{from{opacity:0;transform:translateY(14px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}`}</style>
      </div>
    </div>
  );
}
