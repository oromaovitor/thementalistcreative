import type { Metadata, Viewport } from "next";
import "@fontsource/bodoni-moda/latin-400.css";
import "@fontsource/bodoni-moda/latin-400-italic.css";
import "@fontsource/bodoni-moda/latin-500.css";
import "@fontsource/libre-franklin/latin-300.css";
import "@fontsource/libre-franklin/latin-400.css";
import "@fontsource/libre-franklin/latin-500.css";
import "@fontsource/special-elite/latin-400.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import InvestigationThread from "@/components/InvestigationThread";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "The Mentalist: o dossiê da série | Dossiê Mentalist", template: "%s | Dossiê Mentalist" },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: "The Mentalist: o dossiê da série",
    description: SITE.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Dossiê Mentalist" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#120d0e", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="grain">
        <RevealObserver />
        <Header />
        <InvestigationThread />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
