import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FlipCard from "@/components/FlipCard";
import { TRIVIA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Curiosidades e bastidores",
  description: "Bastidores de The Mentalist: os títulos vermelhos, a voz de Red John, a trilha de Blake Neely, audiência, prêmios e detalhes de produção.",
  alternates: { canonical: "/curiosidades/" },
};

export default function Curiosidades() {
  return (
    <>
      <PageHeader file="Arquivo 04: curiosidades" title={<>Doze fichas de <span className="italic">bastidor</span>.</>} thread="Fichas">
        <p>Vire cada ficha para ler. Tudo conferido em fontes públicas sobre a produção da série.</p>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRIVIA.map((t, i) => (
            <FlipCard key={t.ref} item={t} delay={(i % 3) * 90} />
          ))}
        </div>
      </section>
    </>
  );
}
