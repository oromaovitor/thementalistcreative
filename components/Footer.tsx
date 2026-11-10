import Link from "next/link";
import { NAV, SITE, FACTS } from "@/lib/data";
import PrintMark from "./PrintMark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-[#0c0809]">
      <PrintMark animate={false} className="pointer-events-none absolute -bottom-24 right-[-40px] h-[420px] w-auto text-blood/[0.07]" title="" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10 lg:py-20">
        <div>
          <p className="font-display text-3xl italic leading-tight text-paper sm:text-4xl">
            Caso encerrado.
            <br />
            <span className="text-smoke">A curiosidade, não.</span>
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-smoke">
            {SITE.name} é um site editorial feito por fãs, sem ligação com a {FACTS.network}, a Warner Bros. ou os criadores da série.
            The Mentalist e seus personagens pertencem aos respectivos detentores de direitos. Os textos daqui são originais.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="font-type text-xs text-gold">Índice do arquivo</p>
          <ul className="mt-4 space-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-paper/80 transition-colors duration-200 hover:text-blood">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-type text-xs text-gold">Ficha rápida</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-gold/10 pb-2">
              <dt className="text-smoke">Criação</dt>
              <dd className="text-right text-paper">{FACTS.creator}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gold/10 pb-2">
              <dt className="text-smoke">Exibição</dt>
              <dd className="text-right text-paper">{FACTS.network}, 2008–2015</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gold/10 pb-2">
              <dt className="text-smoke">Temporadas</dt>
              <dd className="text-right text-paper">{FACTS.seasons}</dd>
            </div>
            <div className="flex justify-between gap-4 pb-2">
              <dt className="text-smoke">Episódios</dt>
              <dd className="text-right text-paper">{FACTS.episodes}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="relative border-t border-gold/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} {SITE.name}. Conteúdo informativo e de entretenimento.</p>
          <p>
            Site desenvolvido por{" "}
            <a href={SITE.creditUrl} target="_blank" rel="noopener" className="text-paper underline decoration-blood/60 underline-offset-4 hover:text-blood">
              Creative Romão
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
