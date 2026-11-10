"use client";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&?*";

// Nomes que piscam e se embaralham, como se a página desconfiasse deles.
export default function GlitchNames({ names }: { names: string[] }) {
  const [display, setDisplay] = useState(names);
  const [active, setActive] = useState(-1);
  const box = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (box.current) io.observe(box.current);
    let scr = 0;
    const iv = window.setInterval(() => {
      if (!visible) return;
      const i = Math.floor(Math.random() * names.length);
      setActive(i);
      let n = 0;
      scr = window.setInterval(() => {
        n++;
        setDisplay((d) => d.map((x, k) => (k === i ? names[k].split("").map((c) => (c === " " || Math.random() > 0.5 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("") : x)));
        if (n > 5) {
          window.clearInterval(scr);
          setDisplay(names);
          setActive(-1);
        }
      }, 55);
    }, 1700);
    return () => {
      io.disconnect();
      window.clearInterval(iv);
      window.clearInterval(scr);
    };
  }, [names]);
  return (
    <ul ref={box} className="divide-y divide-gold/10 border-y border-gold/10">
      {names.map((n, i) => (
        <li key={n} className="flex items-baseline justify-between gap-4 py-4">
          <span aria-label={n} className={`glitch font-display text-2xl text-paper sm:text-4xl ${active === i ? "on" : ""}`}>
            {display[i]}
          </span>
          <span className="font-type text-xs text-smoke">suspeito</span>
        </li>
      ))}
    </ul>
  );
}
