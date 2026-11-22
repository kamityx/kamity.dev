import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

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

const MONTHS_PT_SHORT = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
] as const;

export function getPostSlug(post: PostEntry): string {
  // Strip optional leading YYYY-MM-DD- date prefix for clean URLs
  return post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export async function getPublishedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function countWords(body: string | undefined): number {
  if (!body) return 0;
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function estimateReadingTime(body: string | undefined): number {
  const words = countWords(body);
  return Math.max(1, Math.round(words / 200));
}

export function cleanMdxToMarkdown(body: string | undefined): string {
  if (!body) return '';
  return body
    .replace(/^import\s.+?;?\s*$/gm, '')
    .replace(
      /<Callout(?:\s+title="([^"]*)")?>([\s\S]*?)<\/Callout>/g,
      (_match, title: string | undefined, inner: string) => {
        const heading = title ? `> **${title}**\n` : '';
        const quoted = inner
          .trim()
          .split('\n')
          .map((line) => `> ${line.trim()}`)
          .join('\n');
        return `${heading}${quoted}`;
      },
    )
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function getRelatedPosts(
  allPosts: PostEntry[],
  currentPost: PostEntry,
  limit = 3,
): PostEntry[] {
  const currentSlug = getPostSlug(currentPost);
  const currentTags = new Set(currentPost.data.tags);

  return allPosts
    .filter((p) => getPostSlug(p) !== currentSlug)
    .map((candidate) => {
      const sharedTags = candidate.data.tags.filter((t) =>
        currentTags.has(t),
      ).length;
      const sameSeries =
        currentPost.data.series &&
        candidate.data.series?.name === currentPost.data.series.name
          ? 2
          : 0;
      return { candidate, score: sharedTags + sameSeries };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.data.pubDate.valueOf() - a.candidate.data.pubDate.valueOf(),
    )
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function formatDayShort(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = MONTHS_PT_SHORT[date.getUTCMonth()];
  return `${day} ${month}`;
}

export function formatFullDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = MONTHS_PT_SHORT[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export interface MonthGroup {
  key: string;
  monthLabel: string;
  year: string;
  posts: PostEntry[];
}

export function groupPostsByMonth(posts: PostEntry[]): MonthGroup[] {
  const map = new Map<string, MonthGroup>();

  for (const post of posts) {
    const year = String(post.data.pubDate.getUTCFullYear());
    const monthIndex = post.data.pubDate.getUTCMonth();
    const monthNum = String(monthIndex + 1).padStart(2, '0');
    const key = `${year}-${monthNum}`;

    let group = map.get(key);
    if (!group) {
      group = {
        key,
        monthLabel: MONTHS_PT_LONG[monthIndex],
        year,
        posts: [],
      };
      map.set(key, group);
    }
    group.posts.push(post);
  }

  return [...map.values()];
}

export function getAllTags(posts: PostEntry[]): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function getSeriesPosts(
  allPosts: PostEntry[],
  seriesName: string,
): PostEntry[] {
  return allPosts
    .filter((p) => p.data.series?.name === seriesName)
    .sort((a, b) => (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0));
}
