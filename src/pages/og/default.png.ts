import { SITE } from '../../config';
import { renderOgPng } from '../../lib/og';

export async function GET() {
  const png = await renderOgPng({
    title: SITE.shortAuthor,
    description: SITE.description,
    meta: 'blog de engenharia',
  });

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}
