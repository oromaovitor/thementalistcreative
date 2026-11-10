// Impressão digital original (gerada por fórmula), usada como símbolo do site.
type Opts = { cx: number; cy: number; loops: number; step: number; seed: number };

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function fingerprintPaths({ cx, cy, loops, step, seed }: Opts): string[] {
  const r = rand(seed);
  const out: string[] = [];
  for (let i = 0; i < loops; i++) {
    const base = 4 + i * step;
    const gapStart = r() * Math.PI * 2;
    const gapLen = 0.25 + r() * 0.55 + (i > loops - 4 ? 0.6 : 0);
    const segs = 90;
    let d = "";
    for (let k = 0; k <= segs; k++) {
      const t = gapStart + gapLen + (k / segs) * (Math.PI * 2 - gapLen);
      const wob = 1 + 0.035 * Math.sin(3 * t + i * 0.9) + 0.02 * Math.sin(5 * t - i * 0.6);
      // arco "superior" mais largo, como uma digital de verdade
      const rx = base * wob;
      const ry = base * 1.28 * wob * (Math.sin(t) < 0 ? 1 : 0.92);
      const x = cx + rx * Math.cos(t);
      const y = cy + ry * Math.sin(t) + (Math.sin(t) > 0 ? i * 0.35 : 0);
      d += (k === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    out.push(d);
  }
  return out;
}

const DRIPS = [
  { x: 62, from: 168, len: 52, w: 3.2, d: 1.5 },
  { x: 81, from: 180, len: 86, w: 4.5, d: 1.75 },
  { x: 99, from: 184, len: 34, w: 2.6, d: 1.6 },
  { x: 118, from: 180, len: 64, w: 3.6, d: 1.9 },
  { x: 136, from: 170, len: 104, w: 3, d: 1.7 },
];

export default function PrintMark({
  className = "",
  animate = true,
  title = "Impressão digital pintada em vermelho",
}: {
  className?: string;
  animate?: boolean;
  title?: string;
}) {
  const paths = fingerprintPaths({ cx: 100, cy: 104, loops: 13, step: 4.6, seed: 7 });
  return (
    <svg viewBox="0 0 200 300" className={`${animate ? "draw" : ""} ${className}`} role="img" aria-label={title}>
      <defs>
        <filter id="paint" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="3.2" />
        </filter>
      </defs>
      <g filter="url(#paint)" fill="none" stroke="currentColor" strokeLinecap="round">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            strokeWidth={2.6 + (i % 3) * 0.5}
            style={{ ["--d" as string]: `${i * 70}ms`, ["--dur" as string]: "1.6s" }}
          />
        ))}
        {DRIPS.map((p, i) => (
          <g
            key={i}
            className={animate ? "drip" : ""}
            style={{ transformBox: "fill-box", ["--d" as string]: `${p.d}s`, ["--dur" as string]: `${1.8 + i * 0.3}s` }}
          >
            <line x1={p.x} y1={p.from} x2={p.x} y2={p.from + p.len} strokeWidth={p.w} />
            <circle cx={p.x} cy={p.from + p.len + p.w * 0.6} r={p.w * 0.9} fill="currentColor" stroke="none" />
          </g>
        ))}
      </g>
    </svg>
  );
}
