"use client";
import { useEffect, useRef, useState } from "react";

// "Leitura fria": o site lê o visitante como Patrick Jane faria.
// Usa só informações do próprio navegador; nada é enviado a lugar nenhum.
function buildLines(): string[] {
  const now = new Date();
  const h = now.getHours();
  const hm = `${String(h).padStart(2, "0")}h${String(now.getMinutes()).padStart(2, "0")}`;
  const ua = navigator.userAgent || "";
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const insta = /Instagram/i.test(ua);
  let returning = false;
  try {
    returning = localStorage.getItem("dossie-visto") === "1";
    localStorage.setItem("dossie-visto", "1");
  } catch {}

  const lines: string[] = [];
  if (h < 5) lines.push(`${hm}. Madrugada. A casa em silêncio, e você ainda acordado.`);
  else if (h < 12) lines.push(`${hm}. Manhã. Aposto que tem um café esfriando aí do lado.`);
  else if (h < 18) lines.push(`${hm}. Meio da tarde. Você devia estar fazendo outra coisa agora.`);
  else lines.push(`${hm}. Noite. Você deveria estar descansando… mas alguma coisa te trouxe até aqui.`);

  if (insta) lines.push("Veio do Instagram. Rolava o feed sem procurar nada, e parou justo aqui.");
  else if (touch) lines.push("Pelo celular, segurando com uma mão só.");
  else lines.push("No computador, com outras abas abertas que você está fingindo que não existem.");

  if (returning) lines.push("E não é a primeira vez que você entra. Eu reparei.");
  lines.push("Relaxe. Eu não leio mentes. Só presto atenção.");
  return lines;
}

export default function ColdRead() {
  const [lines, setLines] = useState<string[]>([]);
  const [shown, setShown] = useState("");
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const scrolled = useRef(false);

  useEffect(() => {
    const l = buildLines();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLines(l);
      setIdx(l.length);
      setDone(true);
      return;
    }
    const s = () => (scrolled.current = true);
    window.addEventListener("scroll", s, { passive: true, once: true });
    const t = window.setTimeout(() => setLines(l), 900);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", s);
    };
  }, []);

  useEffect(() => {
    if (!lines.length || done) return;
    if (idx >= lines.length) {
      setDone(true);
      const t = window.setTimeout(() => {
        if (!scrolled.current) setLines((p) => [...p, "Ainda parado. Está decidindo se confia em mim."]);
        setDone(false);
      }, 5000);
      return () => window.clearTimeout(t);
    }
    const target = lines[idx];
    if (shown.length < target.length) {
      const ch = target[shown.length];
      const t = window.setTimeout(() => setShown(target.slice(0, shown.length + 1)), ".,…".includes(ch) ? 220 : 26);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setIdx((i) => i + 1);
      setShown("");
    }, 650);
    return () => window.clearTimeout(t);
  }, [lines, idx, shown, done]);

  return (
    <div aria-live="polite" className="min-h-[7.5rem] font-type text-[13px] leading-relaxed text-paper/85 sm:text-sm">
      {lines.slice(0, idx).map((l, i) => (
        <p key={i} className={i === lines.length - 1 && idx >= lines.length ? "text-gold-soft" : ""}>
          {l}
        </p>
      ))}
      {idx < lines.length && <p className="caret">{shown}</p>}
    </div>
  );
}
