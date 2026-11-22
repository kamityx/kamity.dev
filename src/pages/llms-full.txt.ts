import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { PROJECTS, STACK_GROUPS, TALKS } from '../data/projects';
import {
  cleanMdxToMarkdown,
  formatFullDate,
  getPostSlug,
  getPublishedPosts,
} from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const base = SITE.url.replace(/\/$/, '');

  const sections: string[] = [
    `# ${SITE.name} — Conteúdo Completo`,
    '',
    `Autor: ${SITE.author}`,
    `Site: ${base}/`,
    `GitHub: ${SITE.github}`,
    `LinkedIn: ${SITE.linkedin}`,
    `Contato: ${SITE.email}`,
    '',
    '## Sobre',
    '',
    'Engenheiro de Software Sênior com mais de 7 anos de experiência projetando e sustentando arquiteturas distribuídas de alta escala, ecossistemas de e-commerce e infraestrutura logística crítica. No dia a dia atua no Luizalabs (Magalog) com microsserviços orientados a eventos em Java (Spring Boot, Quarkus), TypeScript, Node.js, RabbitMQ e MongoDB. Em paralelo desenvolve projetos pessoais em Rust (incluindo MitgOT com Tokio, Bevy ECS, PostgreSQL e Valkey).',
    '',
    '## Projetos Entregues & Laboratório',
    '',
    ...PROJECTS.flatMap((p) => [
      `### ${p.name} (${p.period} · ${p.context})`,
      `Papel: ${p.role} | Destaque: ${p.highlight}`,
      ...(p.url ? [`URL: ${p.url}`] : []),
      `Stack: ${p.stack.join(', ')}`,
      '',
      p.summary,
      ...p.details.map((d) => `- ${d}`),
      '',
    ]),
    '## Palestras',
    '',
    ...TALKS.map(
      (t) =>
        `- ${t.year} · ${t.event} (${t.stage}): "${t.title}". ${t.summary}${t.url ? ` (${t.url})` : ''}`,
    ),
    '',
    '## Stack Principal',
    '',
    ...STACK_GROUPS.map((g) => `- **${g.label}:** ${g.items}`),
    '',
    '---',
    '',
    '## Artigos Publicados',
    '',
    ...posts.flatMap((post) => {
      const slug = getPostSlug(post);
      const url = `${base}/posts/${slug}/`;
      const mdBody = cleanMdxToMarkdown(post.body);
      return [
        `### ${post.data.title}`,
        `URL: ${url}`,
        `Publicado em: ${formatFullDate(post.data.pubDate)}`,
        `Tags: ${post.data.tags.join(', ')}`,
        `Resumo: ${post.data.description}`,
        '',
        mdBody,
        '',
        '---',
        '',
      ];
    }),
  ];

  return new Response(sections.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
