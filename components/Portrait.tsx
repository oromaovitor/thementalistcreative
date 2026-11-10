import type { Character } from "@/lib/data";

// Espaço para foto licenciada. Por enquanto, monograma sobre textura.
export default function Portrait({ c, className = "" }: { c: Character; className?: string }) {
  const initials = c.id === "redjohn" ? "?" : c.name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  const dark = c.id === "redjohn";
  return (
    <span
      className={`relative block overflow-hidden ${dark ? "bg-[#0a0607]" : "bg-[radial-gradient(90%_80%_at_30%_20%,#4a1a20,#1b1012)]"} ${className}`}
      role="img"
      aria-label={`Espaço reservado para foto de ${c.name}`}
    >
      <span className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(115deg,transparent_0_6px,rgba(0,0,0,.35)_6px_7px)]" />
      <span className={`absolute inset-0 grid place-items-center font-display text-6xl italic ${dark ? "text-blood" : "text-gold-soft/80"}`}>{initials}</span>
      <span className="absolute bottom-1.5 left-2 font-type text-[9px] text-paper/40">foto a definir</span>
    </span>
  );
}
