import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EvidenceBoard from "@/components/EvidenceBoard";
import { RECURRING } from "@/lib/data";

export const metadata: Metadata = {
  title: "Personagens e elenco",
  description: "Patrick Jane, Teresa Lisbon, Cho, Rigsby, Van Pelt, a equipe do FBI e Red John: perfis, personalidades e as relações entre os personagens de The Mentalist.",
  alternates: { canonical: "/personagens/" },
};

export default function Personagens() {
  return (
    <>
      <PageHeader file="Arquivo 02: personagens" title={<>Quem é quem no <span className="italic">quadro</span>.</>} thread="Quadro">
        <p>Toda investigação começa com um mural de fotos e um rolo de linha vermelha. Este é o nosso.</p>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <EvidenceBoard />
      </section>
      <section data-thread="Recorrentes" className="border-t border-gold/10 bg-coal/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="reveal font-display text-4xl text-paper sm:text-5xl">Rostos que voltam</h2>
          <p className="reveal mt-4 max-w-2xl text-lg text-paper/75">Personagens recorrentes que cruzam o caminho de Jane em mais de uma temporada.</p>
          <ul className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {RECURRING.map((r, i) => (
              <li key={r.name} className="reveal border-b border-gold/15 py-6" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
                <p className="font-display text-2xl text-paper">{r.name}</p>
                <p className="font-type text-xs text-gold">{r.actor}</p>
                <p className="mt-3 leading-relaxed text-paper/70">{r.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
