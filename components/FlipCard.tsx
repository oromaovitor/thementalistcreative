"use client";
import { useState } from "react";
import { RotateCw } from "lucide-react";
import type { Trivia } from "@/lib/data";

export default function FlipCard({ item, delay = 0 }: { item: Trivia; delay?: number }) {
  const [on, setOn] = useState(false);
  return (
    <div className="reveal" style={{ ["--d" as string]: `${delay}ms` }}>
      <button
        type="button"
        onClick={() => setOn((o) => !o)}
        aria-pressed={on}
        aria-label={`${item.title}. ${on ? "Mostrar a frente da ficha" : "Virar a ficha para ler"}`}
        className={`flip group block h-[22rem] w-full text-left ${on ? "on" : ""}`}
      >
        <span className="flip-inner relative block h-full w-full">
          <span className="flip-face paper absolute inset-0 flex flex-col justify-between rounded-sm p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,.8)]">
            <span className="flex items-start justify-between">
              <span className="font-type text-xs text-bordo">{item.ref}</span>
              <span className="rotate-[-8deg] rounded-sm border-2 border-blood/70 px-2 py-0.5 font-type text-[11px] text-blood/80">{item.tag}</span>
            </span>
            <span className="font-display text-3xl leading-tight text-[#2a1d1a]">{item.title}</span>
            <span className="flex items-center gap-2 font-type text-xs text-[#5a4335]">
              <RotateCw size={14} className="transition-transform duration-500 group-hover:rotate-180" aria-hidden />
              Toque para virar
            </span>
          </span>
          <span className="flip-face flip-back absolute inset-0 flex flex-col rounded-sm border border-gold/25 bg-coal p-6">
            <span className="font-type text-xs text-gold">{item.tag}</span>
            <span className="mt-3 font-display text-xl text-paper">{item.title}</span>
            <span className="mt-3 text-[15px] leading-relaxed text-paper/80">{item.text}</span>
          </span>
        </span>
      </button>
    </div>
  );
}
