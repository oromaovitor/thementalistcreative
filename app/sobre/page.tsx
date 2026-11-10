import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { FACTS, SOURCES } from "@/lib/data";

export const metadata: Metadata = {
  title: "A série: história, produção e estilo",
  description: "A história e o conceito de The Mentalist, a ficha de produção da série de Bruno Heller e o que define seu jeito de contar crimes.",
  alternates: { canonical: "/sobre/" },
};

const SHEET = [
  ["Criação", FACTS.creator],
  ["Emissora", FACTS.network],
  ["País", FACTS.country],
  ["Exibição", `${FACTS.firstAired} a ${FACTS.lastAired}`],
  ["Temporadas", String(FACTS.seasons)],
  ["Episódios", String(FACTS.episodes)],
  ["Duração", FACTS.runtime],
  ["Trilha sonora", FACTS.composer],
  ["Produção", FACTS.companies],
  ["Gênero", FACTS.genre],
  ["No Brasil", FACTS.brazil],
];

const LAYERS = [
  {
    t: "O caso da semana",
    d: "Quase todo episódio traz um crime novo, apresentado e resolvido em cerca de 40 minutos. É aqui que brilha o método de Jane: provocar suspeitos, montar armadilhas e encontrar o detalhe que muda tudo.",
  },
  {
    t: "O arco de Red John",
    d: "Por baixo dos casos corre uma história longa, a caçada ao assassino que destruiu a família de Jane. Ela aparece em poucos episódios por temporada, quase sempre nos mais tensos, e vai tomando conta da série a partir da 4ª.",
  },
  {
    t: "A virada",
    d: "Na metade da 6ª temporada o mistério é resolvido. O CBI fecha, a ação vai para o FBI no Texas e a série ganha um tom mais leve, com espaço para a relação entre Jane e Lisbon.",
  },
];

export default function Sobre() {
  return (
    <>
      <PageHeader file="Arquivo 01: a série" title={<>Um falso vidente a serviço da <span className="italic">verdade</span>.</>} thread="A série">
        <p>
          The Mentalist é um drama policial americano criado por {FACTS.creator}. Ficou no ar por sete temporadas na {FACTS.network}, entre 2008 e 2015, e somou{" "}
          {FACTS.episodes} episódios.
        </p>
      </PageHeader>

      <section data-thread="História" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div className="space-y-6 text-lg leading-relaxed text-paper/80">
            <h2 className="reveal font-display text-4xl text-paper sm:text-5xl">História e conceito</h2>
            <p className="reveal">
              Patrick Jane fez fortuna dizendo falar com os mortos em programas de televisão. Quando ironizou ao vivo um assassino em série chamado Red John, recebeu a
              resposta mais cruel possível: a mulher e a filha foram assassinadas, e o criminoso deixou sua assinatura na parede.
            </p>
            <p className="reveal">
              Jane abandona o personagem de vidente e passa a admitir o que sempre foi verdade: nunca teve poder nenhum. O que ele tem é uma capacidade fora do comum de
              observar pessoas. Esse talento o leva ao CBI, o California Bureau of Investigation, em Sacramento, onde trabalha como consultor da equipe da agente Teresa Lisbon.
            </p>
            <p className="reveal">
              A graça da série está no contraste. Jane resolve crimes com charme, deboche e pouquíssimo respeito pelas regras, mas carrega uma ferida que nunca fecha. Cada
              episódio é um quebra-cabeça. A temporada inteira, uma vingança em câmera lenta.
            </p>
          </div>
          <aside className="reveal self-start rounded-sm border border-gold/20 bg-coal/60 p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="font-display text-3xl italic text-paper">O que é um mentalista</h2>
            <p className="mt-4 leading-relaxed text-paper/80">
              No mundo do espetáculo, mentalista é o artista que parece ler pensamentos, prever escolhas ou adivinhar segredos. Na prática, combina observação,
              psicologia, sugestão e truques de palco. O título resume o protagonista: alguém que conhece todos os truques e, por isso mesmo, percebe quando outra pessoa
              está usando um.
            </p>
          </aside>
        </div>
      </section>

      <section data-thread="Produção" className="border-y border-gold/10 bg-[#0d090a] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="reveal font-display text-4xl text-paper sm:text-5xl">Ficha de produção</h2>
          <dl className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {SHEET.map(([k, v], i) => (
              <div key={k} className="reveal flex flex-col gap-1 border-b border-gold/15 py-5" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
                <dt className="font-type text-xs text-gold">{k}</dt>
                <dd className="font-display text-2xl text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section data-thread="Narrativa" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <h2 className="reveal max-w-3xl font-display text-4xl leading-[1.05] text-paper sm:text-6xl">Gênero e características narrativas</h2>
        <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">
          Drama policial com mistério, no formato procedural: o episódio se fecha em si mesmo, mas a história maior continua de um para o outro. São três camadas.
        </p>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {LAYERS.map((l, i) => (
            <article key={l.t} className="reveal border-t-2 border-blood/70 pt-6" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <h3 className="font-display text-3xl text-paper">{l.t}</h3>
              <p className="mt-4 leading-relaxed text-paper/75">{l.d}</p>
            </article>
          ))}
        </div>
        <div className="reveal mt-20 grid gap-8 rounded-sm border border-gold/15 p-6 sm:p-10 lg:grid-cols-[1fr_2fr]">
          <h3 className="font-display text-3xl italic text-gold-soft">O tom</h3>
          <p className="text-lg leading-relaxed text-paper/80">
            O humor vem do próprio Jane: as encenações, as provocações, o chá na xícara de porcelana no meio da delegacia. A tragédia vem do mesmo lugar. A série alterna
            os dois sem aviso, e é por isso que funciona: o público ri com Jane e, no minuto seguinte, entende o tamanho do que ele perdeu.
          </p>
        </div>
        <div className="reveal mt-16 flex flex-wrap gap-4">
          <Link href="/personagens/" className="press inline-flex h-12 items-center rounded-full bg-blood px-6 text-sm text-paper hover:bg-[#b3212d]">
            Conhecer os personagens
          </Link>
          <Link href="/temporadas/" className="press inline-flex h-12 items-center rounded-full border border-paper/25 px-6 text-sm text-paper hover:border-blood hover:text-blood">
            Ver as temporadas
          </Link>
        </div>
        <div className="mt-20 border-t border-gold/10 pt-6">
          <p className="font-type text-xs text-smoke">Fontes consultadas</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener" className="text-paper/70 underline decoration-gold/30 underline-offset-4 hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
