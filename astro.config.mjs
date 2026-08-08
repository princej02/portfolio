// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from "@astrojs/mdx";

import expressiveCode from 'astro-expressive-code'

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Commit Mono",
      cssVariable: "--font-mono"
    },
    {
      provider: fontProviders.local(),
      name: "Satoshi",
      cssVariable: "--font-sans",
      options: {
        variants: [
          {
            weight: "100 900",
            display: "swap",
            src: ['./src/assets/fonts/Satoshi-Variable.woff2'],
          }
        ]
      }
    }
  ],
  // TODO: replace with your real production domain before deploying —
  // this feeds the sitemap, canonical URLs, RSS links, and Open Graph tags
  site: 'https://replace-with-your-domain.com',
  integrations: [// must come after expressiveCode
  expressiveCode({
    themes: ['github-dark'],  // swap to any Shiki theme
    styleOverrides: {
      borderRadius: '0px',    // flat, matches your aesthetic
      frames: {
        frameBoxShadowCssValue: 'none',
      }
    }
  }), mdx(), react(), sitemap()],
});