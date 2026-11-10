/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exporta o site como arquivos estáticos (rápido e barato na Vercel).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Só para a prévia no Claude (o host reserva pastas que começam com "_").
  assetPrefix: process.env.PREVIEW ? "/assets" : undefined,
};
export default nextConfig;
