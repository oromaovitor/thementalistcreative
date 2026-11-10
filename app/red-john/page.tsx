import type { Metadata } from "next";
import Link from "next/link";
import PrintMark from "@/components/PrintMark";
import Redacted from "@/components/Redacted";
import GlitchNames from "@/components/GlitchNames";
import IdentityGate from "@/components/IdentityGate";
import { SoundButton } from "@/components/Header";

export const metadata: Metadata = {
  title: "Red John: o arquivo do assassino",
  description: "O vilão de The Mentalist: quem é Red John, como a caçada evoluiu temporada a temporada e a lista final de suspeitos. A identidade fica escondida.",
  alternates: { canonical: "/red-john/" },
};

const HUNT = [
  { s: "1ª–2ª", t: "Um fantasma", d: "Red John aparece pouco, mas cada aparição deixa a equipe abalada. Fica claro que ele observa Jane de perto." },
  { s: "3ª", t: "Um rosto falso", d: "Jane chega perto, encara alguém que diz ser o assassino e toma uma decisão sem volta." },
  { s: "4ª", t: "A isca", d: "Jane se transforma na isca de um plano longo e silencioso, escondido até da própria equipe." },
  { s: "5ª", t: "A rede", d: "Surge a Associação Blake, uma rede de agentes da lei a serviço de Red John. Ninguém é confiável." },
  { s: "6ª", t: "A lista", d: "Sete nomes. Os suspeitos caem um a um até sobrar apenas a verdade, no oitavo episódio." },
];

const SUSPECTS = ["Gale Bertram", "Ray Haffner", "Thomas McAllister", "Reede Smith", "Bret Stiles"];

export default function RedJohn() {
  return (
    <div className="bg-black">
      <section data-thread="Arquivo" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_40%,rgba(107,20,32,.5),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1fr_26rem] lg:px-10">
          <div>
            <p className="reveal font-type text-xs text-blood">Arquivo 05: confidencial</p>
            <h1 className="reveal mt-4 font-display text-[clamp(4rem,15vw,11rem)] leading-[0.82] text-paper" style={{ ["--d" as string]: "120ms" }}>
              Red <span className="italic text-blood">John</span>
            </h1>
            <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-paper/75" style={{ ["--d" as string]: "260ms" }}>
              O assassino que move a série por seis temporadas. Esta página tem spoilers leves sobre a caçada. A identidade dele fica trancada no fim, e só abre se você quiser.
            </p>
            <div className="reveal mt-8 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "380ms" }}>
              <SoundButton />
              <span className="font-type text-xs text-smoke">Recomendado: som ligado, luz apagada.</span>
            </div>
          </div>
          <PrintMark className="mx-auto h-[360px] w-auto text-blood sm:h-[480px]" />
        </div>
      </section>

      <section data-thread="Relatório" className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <div className="paper relative rounded-sm p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,1)] sm:p-12">
          <span className="absolute right-6 top-6 rotate-[8deg] rounded-sm border-2 border-blood px-3 py-1 font-type text-sm text-blood sm:right-10 sm:top-10">Confidencial</span>
          <p className="pr-28 font-type text-xs text-bordo sm:pr-40">CBI, Sacramento. Relatório sobre o suspeito conhecido como Red John</p>
          <h2 className="mt-6 max-w-[80%] font-display text-3xl leading-tight text-[#2a1d1a] sm:text-4xl">O que se sabe</h2>
          <div className="mt-6 space-y-5 font-type text-[15px] leading-[1.9] text-[#2a1d1a]">
            <p>
              <Redacted>Cinco anos antes do primeiro episódio, matou a esposa e a filha de Patrick Jane,</Redacted>{" "}
              <Redacted delay={300}>depois que Jane zombou dele em um programa de televisão.</Redacted>
            </p>
            <p>
              <Redacted delay={100}>Em cada cena de crime, deixa uma assinatura pintada na parede com o sangue da vítima.</Redacted>{" "}
              <Redacted delay={400}>Nunca deixa o rosto.</Redacted>
            </p>
            <p>
              <Redacted delay={150}>Tem seguidores leais, alguns dentro da polícia e das agências de investigação,</Redacted>{" "}
              <Redacted delay={450}>e uma paciência fora do comum.</Redacted>
            </p>
            <p>
              <Redacted delay={200}>Em algum momento, Jane apertou a mão dele sem saber.</Redacted>
            </p>
          </div>
        </div>
      </section>

      <section data-thread="Caçada" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <h2 className="reveal font-display text-4xl text-paper sm:text-6xl">A caçada, temporada por temporada</h2>
        <ol className="relative mt-14 space-y-12 border-l border-blood/40 pl-8 sm:pl-12">
          {HUNT.map((h, i) => (
            <li key={h.s} className="reveal relative" style={{ ["--d" as string]: `${i * 60}ms` }}>
              <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-blood shadow-[0_0_12px_rgba(158,27,38,.9)] sm:-left-[53px]" />
              <p className="font-type text-xs text-gold">Temporada {h.s}</p>
              <p className="mt-2 font-display text-3xl text-paper">{h.t}</p>
              <p className="mt-2 max-w-2xl leading-relaxed text-paper/70">{h.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section data-thread="Suspeitos" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="reveal font-display text-4xl leading-[1.05] text-paper sm:text-6xl">Não confie em ninguém.</h2>
            <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-paper/75">
              Na reta final, Jane reúne os suspeitos que restaram na lista em um mesmo lugar. Um deles é o assassino. Os nomes estão em ordem alfabética do sobrenome, para não
              entregar nada.
            </p>
          </div>
          <GlitchNames names={SUSPECTS} />
        </div>
      </section>

      <section data-thread="Identidade" className="mx-auto max-w-4xl px-6 pb-28 pt-10 lg:px-10">
        <IdentityGate />
        <div className="mt-12 text-center">
          <Link href="/temporadas/" className="inline-flex border-b border-blood pb-1 text-paper hover:text-blood">
            Ver como a série continua depois disso
          </Link>
        </div>
      </section>
    </div>
  );
}
