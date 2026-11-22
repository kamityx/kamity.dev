# kamity.dev

Blog pessoal de engenharia de software de Guilherme (Kamity) Fontes.

## Stack
- **Astro** (Static Site Generation) + **MDX**
- **Pagefind** (busca full-text estática feita em Rust)
- **Shiki** (syntax highlighting no build)
- **Satori + Resvg** (geração automática de Open Graph PNG em `/og/*.png` para LinkedIn)
- **Cloudflare Workers Static Assets / Cloudflare Pages** ($0/mês)
- **Pages CMS** (`.pages.yml` pronto para edição visual via navegador salvando `.mdx` no Git)

## Comandos locais

```bash
pnpm install
pnpm dev       # servidor local em http://localhost:4321
pnpm check     # validação TypeScript / Astro
pnpm build     # gera dist/ + índice estático do Pagefind
pnpm preview   # testa o build final localmente (inclui Pagefind)
```

## Como escrever um novo artigo

Crie um arquivo `.mdx` em `src/content/posts/` (ex.: `2026-11-25-meu-artigo.mdx`):

```mdx
---
title: "Título direto do artigo"
description: "Resumo em 1 ou 2 linhas."
pubDate: 2026-11-25
tags: ["rust", "distributed-systems"]
series:
  name: "Servidor MMORPG em Rust"
  order: 1
linkedinUrl: "https://www.linkedin.com/in/..."
draft: false
---

import Callout from '../../components/Callout.astro';

Texto do artigo...

<Callout title="Trade-off real">
  O que melhorou e o que ficou mais complexo.
</Callout>
```

> Artigos com `draft: true` aparecem em `pnpm dev`, mas são ignorados automaticamente no `pnpm build` de produção.

## Deploy na Cloudflare

1. Suba este repositório para o GitHub.
2. No painel da Cloudflare: **Compute → Workers & Pages → Create → Connect to Git**.
3. Configure:
   - **Production branch:** `main`
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
4. Adicione o domínio customizado `kamity.dev` em **Settings → Domains & Routes**.
