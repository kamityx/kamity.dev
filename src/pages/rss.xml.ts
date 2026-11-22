import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getPostSlug, getPublishedPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${getPostSlug(post)}/`,
      categories: post.data.tags,
    })),
    customData: '<language>pt-br</language>',
  });
}
