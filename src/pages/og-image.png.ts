import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

// Prerendered at build time into dist/og-image.png. Colours are the hex
// equivalents of the dark-theme tokens in src/styles/global.css (satori
// doesn't understand oklch), so keep them in sync if the palette changes.
const colors = {
  background: '#0f0f0f', // --color-background
  text: '#e8e8e8', // --color-text
  muted: '#636363', // --color-text-muted
  border: '#1b1b1b', // --color-border
  live: '#00c950', // tailwind green-500
}

type Node = { type: string; props: Record<string, unknown> }

function h(type: string, style: Record<string, unknown>, children?: unknown): Node {
  return { type, props: { style, children } }
}

const fontDir = join(process.cwd(), 'src/assets/fonts/og')

export async function GET() {
  const [regular, bold] = await Promise.all([
    readFile(join(fontDir, 'Satoshi-Regular.woff')),
    readFile(join(fontDir, 'Satoshi-Bold.woff')),
  ])

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 90px',
      background: colors.background,
      color: colors.text,
      fontFamily: 'Satoshi',
    },
    [
      h('div', { fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: colors.muted, marginBottom: 28 }, 'Experimental Deviant'),
      h('div', { fontSize: 96, fontWeight: 700, lineHeight: 1, marginBottom: 36 }, 'Prince Jecco-Obi'),
      h('div', { fontSize: 30, lineHeight: 1.5, color: colors.muted, maxWidth: 900, marginBottom: 44 }, 'I build interfaces that feel as good as they look, and systems that do exactly what they should.'),
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: 14,
          padding: '14px 22px',
          border: `1px solid ${colors.border}`,
          fontSize: 20,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: colors.muted,
        },
        [
          h('div', { width: 10, height: 10, borderRadius: 999, background: colors.live }),
          h('div', {}, 'Open to 2027 internships'),
        ],
      ),
    ],
  )

  const svg = await satori(tree as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Satoshi', data: regular, weight: 400, style: 'normal' },
      { name: 'Satoshi', data: bold, weight: 700, style: 'normal' },
    ],
  })
  const png = new Resvg(svg).render().asPng()

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  })
}
