import Link from "next/link";
import PrintMark from "@/components/PrintMark";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[90svh] place-items-center px-6 pt-24 text-center">
      <div>
        <PrintMark className="mx-auto h-48 w-auto text-blood" />
        <p className="mt-6 font-type text-xs text-gold">Erro 404</p>
        <h1 className="mt-3 font-display text-5xl text-paper sm:text-6xl">Esta pista não leva a lugar nenhum.</h1>
        <p className="mx-auto mt-4 max-w-md text-paper/70">A página que você procurou não existe ou mudou de endereço.</p>
        <Link href="/" className="press mt-8 inline-flex h-12 items-center rounded-full bg-blood px-6 text-sm text-paper hover:bg-[#b3212d]">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
