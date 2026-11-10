"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Fio dourado na lateral que acompanha a leitura e acende um ponto por seção.
export default function InvestigationThread() {
  const pathname = usePathname();
  const fill = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<{ top: number; label: string }[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = -1;
    const measure = () => {
      const docH = document.documentElement.scrollHeight;
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-thread]"));
      setMarks(
        els.map((el) => ({
          top: Math.min(98, (el.getBoundingClientRect().top + window.scrollY) / Math.max(1, docH - window.innerHeight) * 100),
          label: el.dataset.thread || "",
        }))
      );
    };
    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (Math.abs(p - last) > 0.0005) {
        last = p;
        if (fill.current) fill.current.style.transform = `scaleY(${p})`;
        setProgress(p);
      }
      raf = requestAnimationFrame(loop);
    };
    const t = window.setTimeout(measure, 300);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("load", measure);
    raf = requestAnimationFrame(loop);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("load", measure);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-8 left-1.5 top-24 z-30 w-3 sm:left-3 lg:left-5">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gold/15" />
      <div ref={fill} className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold/20 via-gold to-blood" style={{ transform: "scaleY(0)" }} />
      {marks.map((m, i) => {
        const lit = progress * 100 >= m.top - 0.5;
        return (
          <span
            key={i}
            className="absolute left-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
            style={{
              top: `${m.top}%`,
              width: lit ? 7 : 5,
              height: lit ? 7 : 5,
              background: lit ? "var(--color-blood)" : "rgba(179,144,98,.35)",
              boxShadow: lit ? "0 0 10px 2px rgba(158,27,38,.6)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}
