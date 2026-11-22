import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { PROJECTS, TALKS } from '../data/projects';
import { formatFullDate, getPostSlug, getPublishedPosts } from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const base = SITE.url.replace(/\/$/, '');

  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.author} — Senior Software Engineer focado em sistemas distribuídos, arquitetura, baixa latência e trade-offs reais em Java (Spring Boot, Quarkus), TypeScript/Node.js, Rust, PostgreSQL, Valkey e Cloud.`,
    '',
    '## Páginas principais',
    '',
    `- [Início / Artigos](${base}/): Arquivo cronológico por mês com artigos técnicos de engenharia.`,
    `- [Projetos](${base}/projetos/): Entregas em produção, projetos pessoais, palestras e stack principal.`,
    `- [Sobre](${base}/sobre/): Trajetória profissional e formação acadêmica.`,
    `- [Feed RSS](${base}/rss.xml): Feed RSS 2.0 dos artigos publicados.`,
    `- [Arquivo completo para LLMs](${base}/llms-full.txt): Texto integral em Markdown de todos os artigos e projetos.`,
    '',
    '## Artigos publicados',
    '',
    ...posts.map((post) => {
      const slug = getPostSlug(post);
      const date = formatFullDate(post.data.pubDate);
      const tags = post.data.tags.map((t) => `#${t}`).join(' ');
      return `- [${post.data.title}](${base}/posts/${slug}/) ([Markdown](${base}/posts/${slug}.md)) — ${date} (${tags}): ${post.data.description}`;
    }),
    '',
    '## Projetos em destaque',
    '',
    ...PROJECTS.map((p) => {
      const link = p.url ? ` (${p.url})` : '';
      return `- **${p.name}** (${p.period} · ${p.context})${link}: ${p.summary} Stack: ${p.stack.join(', ')}.`;
    }),
    '',
    '## Palestras',
    '',
    ...TALKS.map(
      (t) =>
        `- **${t.event} · ${t.stage}** (${t.year}): "${t.title}" — ${t.summary}`,
    ),
    '',
    '## Perfis oficiais',
    '',
    `- GitHub: ${SITE.github}`,
    `- LinkedIn: ${SITE.linkedin}`,
    `- Contato: ${SITE.email}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
