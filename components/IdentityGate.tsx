"use client";
import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

// A identidade de Red John fica trancada. Dois passos para abrir.
export default function IdentityGate() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  return (
    <div className="relative overflow-hidden rounded-sm border border-blood/40 bg-[#0a0607] p-6 sm:p-10">
      {step < 2 ? (
        <div className="text-center">
          <Lock className="mx-auto text-blood" size={28} aria-hidden />
          <p className="mt-4 font-display text-3xl text-paper sm:text-4xl">Quem é Red John?</p>
          <p className="mx-auto mt-3 max-w-md text-paper/70">
            {step === 0
              ? "A resposta é o maior spoiler da série. Se você ainda não chegou à 6ª temporada, pare aqui."
              : "Última chance. Depois de ler, não tem como esquecer."}
          </p>
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) as 1 | 2)}
            className={`press mt-8 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm transition-colors duration-200 ${
              step === 0 ? "border border-blood text-paper hover:bg-blood" : "bg-blood text-paper hover:bg-[#b3212d]"
            }`}
          >
            {step === 0 ? "Quero saber" : "Tenho certeza, revelar"}
          </button>
        </div>
      ) : (
        <div className="animate-[fadein_1.2s_cubic-bezier(.23,1,.32,1)]">
          <p className="flex items-center gap-2 font-type text-xs text-blood">
            <Unlock size={14} aria-hidden /> Identidade revelada
          </p>
          <p className="mt-4 font-display text-5xl leading-none text-paper sm:text-7xl">Thomas McAllister</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/80">
            Xerife do condado de Napa, vivido por Xander Berkeley. O personagem aparece já na 1ª temporada, quase como figurante, e só volta à história na 6ª, como um dos
            nomes da lista. A revelação acontece no episódio 8 da 6ª temporada, “Red John”, exibido em 24 de novembro de 2013.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-paper/60">
            A escolha dividiu os fãs. Bruno Heller contou depois que só decidiu quem seria o assassino nos últimos anos antes do episódio.
          </p>
          <style>{`@keyframes fadein{from{opacity:0;filter:blur(10px)}to{opacity:1;filter:none}}`}</style>
        </div>
      )}
    </div>
  );
}
