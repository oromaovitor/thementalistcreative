export default function PageHeader({ file, title, children, thread }: { file: string; title: React.ReactNode; children?: React.ReactNode; thread: string }) {
  return (
    <section data-thread={thread} className="relative overflow-hidden pb-14 pt-32 sm:pt-40 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_80%_0%,#3d0d14_0%,transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="reveal font-type text-xs text-gold">{file}</p>
        <h1 className="reveal mt-4 max-w-5xl font-display text-[clamp(2.8rem,9vw,7rem)] leading-[0.92] tracking-[-0.015em] text-paper" style={{ ["--d" as string]: "120ms" }}>
          {title}
        </h1>
        {children && (
          <div className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-paper/75" style={{ ["--d" as string]: "260ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
