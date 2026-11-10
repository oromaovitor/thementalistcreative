"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { NAV } from "@/lib/data";
import { isSoundOn, onSound, setSound } from "@/lib/sound";
import PrintMark from "./PrintMark";

export function SoundButton({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(isSoundOn());
    const off = onSound(setOn);
    return () => {
      off();
    };
  }, []);
  return (
    <button
      type="button"
      onClick={() => setSound(!on)}
      aria-pressed={on}
      aria-label={on ? "Desligar som ambiente" : "Ligar som ambiente"}
      className={`press inline-flex h-11 items-center gap-2 rounded-full border border-gold/30 px-4 text-xs tracking-wide text-gold-soft transition-colors duration-200 hover:border-gold/70 hover:text-paper ${className}`}
    >
      {on ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
      <span>{on ? "Som ligado" : "Som"}</span>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        Pular para o conteúdo
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          solid || open ? "border-b border-gold/10 bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-10">
          <Link href="/" className="group flex items-center gap-3" aria-label="Dossiê Mentalist, página inicial">
            <PrintMark animate={false} className="h-9 w-6 text-blood transition-transform duration-500 group-hover:rotate-6" title="" />
            <span className="leading-none">
              <span className="block font-display text-xl italic text-paper">Dossiê</span>
              <span className="mt-1 block font-type text-[10px] tracking-[0.2em] text-gold">The Mentalist</span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {NAV.slice(1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive(n.href) ? "text-paper" : "text-smoke hover:text-paper"
                } ${n.href.includes("red-john") ? "text-blood hover:text-blood" : ""}`}
              >
                {n.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-blood transition-transform duration-500 ${
                    isActive(n.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
            <SoundButton className="ml-4" />
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <SoundButton className="px-3" />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="press grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-paper"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movel"
        className={`fixed inset-0 z-40 bg-ink transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="vignette absolute inset-0" />
        <PrintMark animate={false} className="absolute -right-10 bottom-0 h-[70vh] w-auto text-blood/10" title="" />
        <nav aria-label="Menu" className="relative flex h-full flex-col justify-center px-6 pt-16">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              tabIndex={open ? 0 : -1}
              className={`border-b border-gold/10 py-3 font-display text-4xl transition-[transform,opacity] duration-700 sm:text-5xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${isActive(n.href) ? "italic text-paper" : "text-paper/70"} ${n.href.includes("red-john") ? "text-blood" : ""}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              {n.label}
            </Link>
          ))}
          <p className="mt-10 font-type text-xs text-smoke">Arquivo editorial aberto em Sacramento, Califórnia</p>
        </nav>
      </div>
    </>
  );
}
