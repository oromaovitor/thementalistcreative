// Frase que começa censurada (tarja preta) e se revela ao entrar na tela.
export default function Redacted({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="redact" style={{ ["--d" as string]: `${delay}ms` }}>
      <span>{children}</span>
    </span>
  );
}
