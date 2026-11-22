import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../config';

interface OgInput {
  title: string;
  description: string;
  meta?: string;
}

let cachedFonts:
  | Array<{ name: string; data: Buffer; weight: 400 | 500; style: 'normal' }>
  | undefined;

async function loadFonts() {
  if (cachedFonts) return cachedFonts;

  const [serif, sans, mono] = await Promise.all([
    readFile(
      resolve(
        process.cwd(),
        'node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff',
      ),
    ),
    readFile(
      resolve(
        process.cwd(),
        'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
      ),
    ),
    readFile(
      resolve(
        process.cwd(),
        'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
      ),
    ),
  ]);

  cachedFonts = [
    { name: 'Newsreader', data: serif, weight: 500, style: 'normal' },
    { name: 'Inter', data: sans, weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
  ];
  return cachedFonts;
}

export async function renderOgPng({
  title,
  description,
  meta = 'engenharia de software',
}: OgInput): Promise<Uint8Array> {
  const fonts = await loadFonts();

  const titleSize = title.length > 68 ? 46 : title.length > 44 ? 54 : 62;
  const trimmedDesc =
    description.length > 150 ? `${description.slice(0, 147)}...` : description;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#111214',
          color: '#EAE8E3',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                width: '1200px',
                height: '8px',
                backgroundColor: '#E3744F',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                width: '1064px',
                height: '510px',
                marginLeft: '68px',
                marginTop: '56px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '20px',
                      color: '#93918B',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex' },
                          children: [
                            {
                              type: 'span',
                              props: { style: { color: '#EAE8E3' }, children: 'kamity' },
                            },
                            {
                              type: 'span',
                              props: { style: { color: '#E3744F' }, children: '.dev' },
                            },
                          ],
                        },
                      },
                      {
                        type: 'span',
                        props: { children: meta },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      width: '100%',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'Newsreader',
                            fontSize: `${titleSize}px`,
                            fontWeight: 500,
                            lineHeight: 1.18,
                            color: '#FAF9F6',
                          },
                          children: title,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'Inter',
                            fontSize: '24px',
                            lineHeight: 1.48,
                            color: '#A5A29B',
                          },
                          children: trimmedDesc,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px solid #26282C',
                      paddingTop: '22px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '19px',
                      color: '#93918B',
                    },
                    children: [
                      {
                        type: 'span',
                        props: { children: SITE.shortAuthor },
                      },
                      {
                        type: 'span',
                        props: {
                          style: { color: '#E3744F' },
                          children: 'distributed systems · rust · architecture',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  return resvg.render().asPng();
}
