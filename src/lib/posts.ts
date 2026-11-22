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

export function estimateReadingTime(body: string | undefined): number {
  if (!body) return 1;
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
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
