// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dym-batumi-landing.vercel.app',
  // Лендинг из одной страницы: CSS встраиваем в HTML — минус блокирующий запрос
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
