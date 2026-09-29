// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: заменить на прод-домен после первого деплоя на Vercel
  site: 'https://dym-batumi.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
});
