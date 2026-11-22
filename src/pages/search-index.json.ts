import {
  formatFullDate,
  getPostSlug,
  getPublishedPosts,
} from '../lib/posts';

const MONTHS_PT_LONG = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const;

export async function GET() {
  const posts = await getPublishedPosts();

  const payload = posts.map((post) => ({
    url: `/posts/${getPostSlug(post)}`,
    title: post.data.title,
    description: post.data.description,
    date: formatFullDate(post.data.pubDate),
    month: `${MONTHS_PT_LONG[post.data.pubDate.getUTCMonth()]} ${post.data.pubDate.getUTCFullYear()}`,
    tags: post.data.tags,
  }));

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
