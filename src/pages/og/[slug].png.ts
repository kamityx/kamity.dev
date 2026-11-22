import type { APIRoute, GetStaticPaths } from 'astro';
import {
  formatFullDate,
  getPostSlug,
  getPublishedPosts,
  type PostEntry,
} from '../../lib/posts';
import { renderOgPng } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: getPostSlug(post) },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: PostEntry };

  const metaParts = [formatFullDate(post.data.pubDate)];
  if (post.data.tags.length > 0) {
    metaParts.push(post.data.tags.slice(0, 3).map((t) => `#${t}`).join(' '));
  }

  const png = await renderOgPng({
    title: post.data.title,
    description: post.data.description,
    meta: metaParts.join(' · '),
  });

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
