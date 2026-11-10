const WORDS = ["Sacramento", "CBI", "leitura fria", "hipnose", "Red John", "Austin, Texas", "FBI", "chá", "o sofá de couro", "a lista dos sete", "observação"];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-gold/15 bg-wine/40 py-4">
      <div className="marquee flex w-max items-center gap-8 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl italic text-paper/80 sm:text-3xl">
            {w}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood" />
          </span>
        ))}
      </div>
    </div>
  );
}
