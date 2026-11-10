import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SeasonTabs from "@/components/SeasonTabs";
import { SEASONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Temporadas e episódios",
  description: "As sete temporadas de The Mentalist: anos de exibição, número de episódios, sinopses e os marcos de cada fase, com spoilers escondidos.",
  alternates: { canonical: "/temporadas/" },
};

export default function Temporadas() {
  const max = Math.max(...SEASONS.map((s) => s.episodes));
  return (
    <>
      <PageHeader file="Arquivo 03: temporadas" title={<>Sete temporadas, <span className="italic">151</span> episódios.</>} thread="Temporadas">
        <p>Os finais de cada temporada ficam escondidos. Revele só se já assistiu, ou se não se importa.</p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <h2 className="sr-only">Episódios por temporada</h2>
        <div className="reveal flex h-48 items-end gap-2 border-b border-gold/20 sm:gap-4" aria-label="Gráfico de episódios por temporada" role="img">
          {SEASONS.map((s, i) => (
            <div key={s.n} className="group flex flex-1 flex-col items-center justify-end gap-2" data-io style={{ height: "100%" }}>
              <span className="font-type text-xs text-paper/80">{s.episodes}</span>
              <span
                className="block w-full origin-bottom scale-y-0 rounded-t-sm group-[.in]:scale-y-100 bg-gradient-to-t from-bordo to-blood transition-transform duration-1000"
                style={{ height: `${(s.episodes / max) * 78}%`, transitionDelay: `${i * 80}ms` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2 sm:gap-4">
          {SEASONS.map((s) => (
            <span key={s.n} className="flex-1 text-center font-type text-[11px] text-smoke">
              T{s.n}
            </span>
          ))}
        </div>
      </section>

      <section data-thread="Sinopses" className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <SeasonTabs />
      </section>
    </>
  );
}
