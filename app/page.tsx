import Link from "next/link";
import FlashlightHero from "@/components/FlashlightHero";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import PocketWatch from "@/components/PocketWatch";
import Portrait from "@/components/Portrait";
import PrintMark from "@/components/PrintMark";
import Redacted from "@/components/Redacted";
import FlipCard from "@/components/FlipCard";
import { CHARACTERS, SEASONS, TRIVIA, SITE, FACTS } from "@/lib/data";

const METHODS = [
  { t: "Observação", d: "Um punho de camisa gasto, um olhar para a porta, um anel fora do lugar. Jane repara no que todo mundo ignora." },
  { t: "Leitura fria", d: "A técnica dos falsos videntes: frases amplas, atenção à reação e ajustes rápidos até parecer adivinhação." },
  { t: "Hipnose", d: "Usada para destravar memórias de testemunhas e, às vezes, para conseguir o que o protocolo não permite." },
  { t: "Provocação", d: "Ele irrita, encena e arma pequenas peças para que o culpado se entregue sozinho." },
];

export default function Home() {
  const team = CHARACTERS.filter((c) => ["lisbon", "cho", "rigsby", "vanpelt"].includes(c.id));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: "The Mentalist",
    inLanguage: "en",
    genre: ["Drama policial", "Mistério"],
    creator: { "@type": "Person", name: FACTS.creator },
    startDate: "2008-09-23",
    endDate: "2015-02-18",
    numberOfSeasons: 7,
    numberOfEpisodes: 151,
    actor: CHARACTERS.filter((c) => c.id !== "redjohn").map((c) => ({ "@type": "Person", name: c.actor })),
    url: SITE.url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FlashlightHero />
      <Marquee />

      {/* Premissa */}
      <section data-thread="Premissa" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <p className="reveal font-type text-xs text-gold">A premissa</p>
            <h2 className="reveal mt-4 font-display text-4xl leading-[1.05] text-paper sm:text-6xl" style={{ ["--d" as string]: "100ms" }}>
              Ele fingia ler mentes na televisão. Até que alguém respondeu.
            </h2>
            <div className="reveal mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-paper/80" style={{ ["--d" as string]: "200ms" }}>
              <p>
                Patrick Jane ganhava a vida como vidente de programa de TV. Em uma entrevista, provocou um assassino em série conhecido como Red John. A resposta veio da
                pior forma possível: a esposa e a filha de Jane foram mortas.
              </p>
              <p>
                Anos depois, ele trabalha como consultor do CBI, o órgão de investigação da Califórnia, usando o talento verdadeiro que sempre teve. Cada caso resolvido o
                aproxima de um único objetivo.
              </p>
            </div>
            <Link href="/sobre/" className="reveal mt-10 inline-flex items-center gap-2 border-b border-blood pb-1 text-paper transition-colors duration-200 hover:text-blood" style={{ ["--d" as string]: "300ms" }}>
              Ler a história completa da série
            </Link>
          </div>
          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-12 border-t border-gold/15 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="reveal">
              <dt className="font-type text-xs text-smoke">temporadas</dt>
              <dd className="font-display text-7xl leading-none text-paper sm:text-8xl">
                <Counter to={7} />
              </dd>
            </div>
            <div className="reveal" style={{ ["--d" as string]: "100ms" }}>
              <dt className="font-type text-xs text-smoke">episódios</dt>
              <dd className="font-display text-7xl leading-none text-paper sm:text-8xl">
                <Counter to={151} />
              </dd>
            </div>
            <div className="reveal col-span-2" style={{ ["--d" as string]: "200ms" }}>
              <dt className="font-type text-xs text-smoke">do piloto ao último episódio</dt>
              <dd className="font-display text-6xl leading-none text-blood sm:text-7xl">
                2008–<Counter from={2008} to={2015} duration={2200} />
              </dd>
            </div>
            <div className="reveal col-span-2 text-sm leading-relaxed text-smoke" style={{ ["--d" as string]: "300ms" }}>
              Criada por {FACTS.creator}. Exibida pela {FACTS.network} de {FACTS.firstAired} a {FACTS.lastAired}.
            </div>
          </dl>
        </div>
      </section>

      {/* Protagonista */}
      <section data-thread="Patrick Jane" className="relative overflow-hidden border-y border-gold/10 bg-[#0d090a] py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_50%,rgba(179,144,98,.12),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[18rem_1fr] lg:gap-24 lg:px-10">
          <div className="reveal order-2 lg:order-1">
            <PocketWatch />
          </div>
          <div className="order-1 lg:order-2">
            <p className="reveal font-type text-xs text-gold">O protagonista, vivido por Simon Baker</p>
            <h2 className="reveal mt-4 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] text-paper" style={{ ["--d" as string]: "100ms" }}>
              Patrick Jane
            </h2>
            <p className="reveal mt-6 max-w-2xl font-display text-2xl italic leading-snug text-gold-soft sm:text-3xl" style={{ ["--d" as string]: "200ms" }}>
              Ele nunca leu a mente de ninguém. Só aprendeu a ler pessoas melhor do que elas mesmas.
            </p>
            <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {METHODS.map((m, i) => (
                <li key={m.t} className="reveal border-t border-gold/15 pt-5" style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <p className="font-display text-2xl text-paper">{m.t}</p>
                  <p className="mt-2 leading-relaxed text-paper/70">{m.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section data-thread="A equipe" className="py-24 sm:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-10">
          <div>
            <p className="reveal font-type text-xs text-gold">CBI, Sacramento</p>
            <h2 className="reveal mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-paper sm:text-6xl" style={{ ["--d" as string]: "100ms" }}>
              A equipe que precisa aguentar Jane.
            </h2>
          </div>
          <Link href="/personagens/" className="reveal inline-flex shrink-0 border-b border-blood pb-1 text-paper transition-colors duration-200 hover:text-blood">
            Abrir o quadro de investigação
          </Link>
        </div>
        <div className="mt-14 flex snap-x gap-6 overflow-x-auto px-6 pb-8 [scrollbar-width:none] lg:mx-auto lg:max-w-7xl lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-10">
          {team.map((c, i) => (
            <Link
              key={c.id}
              href="/personagens/"
              className="reveal group w-[72vw] max-w-[17rem] shrink-0 snap-center sm:w-[16rem] lg:w-auto lg:max-w-none"
              style={{ ["--d" as string]: `${i * 90}ms` }}
            >
              <div className="paper p-3 pb-5 shadow-[0_24px_40px_-20px_rgba(0,0,0,.9)] transition-transform duration-500 group-hover:-translate-y-2" style={{ rotate: `${[-2, 1.5, -1, 2][i]}deg` }}>
                <Portrait c={c} className="aspect-[4/5] w-full" />
                <p className="mt-4 font-display text-2xl text-[#2a1d1a]">{c.name}</p>
                <p className="font-type text-[11px] text-bordo">{c.actor}</p>
                <p className="mt-3 text-sm leading-snug text-[#4a3a30]">{c.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Temporadas */}
      <section data-thread="Temporadas" className="border-t border-gold/10 bg-coal/40 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="reveal font-type text-xs text-gold">Sete temporadas</p>
              <h2 className="reveal mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-paper sm:text-6xl" style={{ ["--d" as string]: "100ms" }}>
                Uma caçada de seis anos, e o que veio depois dela.
              </h2>
            </div>
            <Link href="/temporadas/" className="reveal inline-flex w-fit border-b border-blood pb-1 text-paper transition-colors duration-200 hover:text-blood">
              Ver todas as temporadas
            </Link>
          </div>
          <ol className="mt-14 border-t border-gold/15">
            {SEASONS.map((s, i) => (
              <li key={s.n} className="reveal" style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
                <Link
                  href="/temporadas/"
                  className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 border-b border-gold/15 py-6 sm:grid-cols-[5rem_1fr_auto] sm:gap-x-8"
                >
                  <span className="font-display text-4xl italic text-gold/60 transition-colors duration-300 group-hover:text-blood sm:text-5xl">{s.n}</span>
                  <span>
                    <span className="block font-display text-2xl text-paper transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{s.title}</span>
                    <span className="mt-1 block text-sm text-smoke">{s.focus}</span>
                  </span>
                  <span className="col-start-2 mt-2 font-type text-xs text-smoke sm:col-start-3 sm:mt-0 sm:text-right">
                    {s.years}
                    <br className="hidden sm:block" />
                    <span className="sm:hidden">, </span>
                    {s.episodes} episódios
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Red John */}
      <section data-thread="Red John" className="relative overflow-hidden bg-black py-24 sm:py-36">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_55%_at_70%_50%,rgba(107,20,32,.45),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_24rem] lg:px-10">
          <div>
            <p className="reveal font-type text-xs text-blood">Arquivo confidencial</p>
            <h2 className="reveal mt-4 font-display text-[clamp(3.4rem,11vw,8rem)] leading-[0.85] text-paper" style={{ ["--d" as string]: "100ms" }}>
              Red John
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/80">
              <Redacted>Assassino em série. Nunca deixa o rosto, só uma assinatura pintada com sangue.</Redacted>{" "}
              <Redacted delay={500}>Tem seguidores dentro da polícia.</Redacted>{" "}
              <Redacted delay={900}>Conhece Jane melhor do que deveria.</Redacted>
            </p>
            <Link
              href="/red-john/"
              className="press reveal mt-10 inline-flex h-12 items-center rounded-full border border-blood px-6 text-sm text-paper transition-colors duration-200 hover:bg-blood"
              style={{ ["--d" as string]: "300ms" }}
            >
              Entrar no arquivo
            </Link>
          </div>
          <PrintMark className="mx-auto h-[340px] w-auto text-blood sm:h-[440px]" />
        </div>
      </section>

      {/* Curiosidades */}
      <section data-thread="Curiosidades" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="reveal font-type text-xs text-gold">Bastidores</p>
            <h2 className="reveal mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-paper sm:text-6xl" style={{ ["--d" as string]: "100ms" }}>
              Fichas que ninguém mostrou na TV.
            </h2>
          </div>
          <Link href="/curiosidades/" className="reveal inline-flex w-fit border-b border-blood pb-1 text-paper transition-colors duration-200 hover:text-blood">
            Abrir todas as fichas
          </Link>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[TRIVIA[1], TRIVIA[0], TRIVIA[3]].map((t, i) => (
            <FlipCard key={t.ref} item={t} delay={i * 90} />
          ))}
        </div>
      </section>
    </>
  );
}
