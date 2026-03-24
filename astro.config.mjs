import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hstar.org',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('~profile'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
