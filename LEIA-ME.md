# Dossiê Mentalist

Site editorial sobre a série The Mentalist (CBS, 2008–2015).
Feito com Next.js, React, TypeScript, Tailwind CSS e Lucide Icons. Desenvolvido por Creative Romão.

## Páginas
- `/` Início: lanterna no escuro, leitura fria do visitante, premissa com números animados, Patrick Jane com o relógio hipnótico, equipe, temporadas, Red John e curiosidades
- `/sobre/` A série: história, o que é um mentalista, ficha de produção, gênero e narrativa
- `/personagens/` Quadro de investigação com fios vermelhos e fichas dos personagens
- `/temporadas/` Gráfico de episódios e abas das 7 temporadas (finais escondidos como spoiler)
- `/curiosidades/` 12 fichas que viram
- `/red-john/` Relatório censurado, linha da caçada, suspeitos com glitch e identidade trancada

## Como publicar na Vercel
1. Suba esta pasta para um repositório no GitHub (sem `node_modules`, `.next` e `out`).
2. Na Vercel: Add New → Project → Import. A Vercel reconhece o Next.js sozinha → Deploy.

Para testar no computador: `npm install` e depois `npm run dev`.

## Pendências (a confirmar)
- **Domínio final**: trocar `url` em `lib/data.ts` (hoje `dossie-mentalist.vercel.app`). Ele alimenta o sitemap, o robots e a imagem de compartilhamento.
- **Link do crédito**: `creditUrl` em `lib/data.ts` aponta para o Instagram @creative.romao; trocar pelo portfólio quando estiver no ar.
- **Fotos**: os cards usam monogramas no lugar das fotos. Só colocar fotos licenciadas ou autorizadas (no componente `components/Portrait.tsx`).

## Onde mexer
- Textos, personagens, temporadas e curiosidades: `lib/data.ts`
- Cores e fontes: topo de `app/globals.css`
- Som ambiente (gerado no navegador, sem arquivos): `lib/sound.ts`

## Aviso
Site de fãs, sem ligação com CBS, Warner Bros. ou os criadores da série. Textos originais; nenhum logotipo, imagem promocional ou marca visual da série é reproduzido. O símbolo de impressão digital é uma criação própria do site.
