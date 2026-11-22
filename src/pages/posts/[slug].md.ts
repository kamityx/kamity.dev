import type { APIRoute, GetStaticPaths } from 'astro';
import { SITE } from '../../config';
import {
  cleanMdxToMarkdown,
  formatFullDate,
  getPostSlug,
  getPublishedPosts,
  type PostEntry,
} from '../../lib/posts';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: getPostSlug(post) },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: PostEntry };
  const slug = getPostSlug(post);
  const base = SITE.url.replace(/\/$/, '');
  const canonicalUrl = `${base}/posts/${slug}/`;

  const lines: string[] = [
    `# ${post.data.title}`,
    '',
    `- Autor: ${SITE.author}`,
    `- URL: ${canonicalUrl}`,
    `- Publicado em: ${formatFullDate(post.data.pubDate)}`,
    ...(post.data.updatedDate
      ? [`- Atualizado em: ${formatFullDate(post.data.updatedDate)}`]
      : []),
    ...(post.data.tags.length > 0
      ? [`- Tags: ${post.data.tags.join(', ')}`]
      : []),
    `- Resumo: ${post.data.description}`,
    '',
    cleanMdxToMarkdown(post.body),
    '',
  ];

  if (post.data.faq && post.data.faq.length > 0) {
    lines.push('## Perguntas frequentes', '');
    for (const item of post.data.faq) {
      lines.push(`### ${item.question}`, '', item.answer, '');
    }
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
