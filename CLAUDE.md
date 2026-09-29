# ДЫМ — демо-лендинг бургерной

Демо-лендинг вымышленной smash-бургерной в Батуми для портфолио Mr. Web. Полное ТЗ, решения и этапы — в [docs/spec.md](docs/spec.md). Сверяйся с ним перед любой работой над лендингом.

## Стек

- Astro 7 (статическая сборка) + Tailwind CSS 4 через `@tailwindcss/vite`. Tailwind подключён в `src/styles/global.css`, дизайн-токены — там же через `@theme`.
- Общий `<head>` — `src/layouts/Layout.astro`.
- Данные (меню, сет, зоны, контакты) — `src/data/menu.ts`. Логика корзины без DOM — `src/scripts/cart-store.ts`, UI корзины и оформления — `src/components/Cart.astro`, карта — `src/scripts/delivery-map.ts` (ленивая загрузка из `Delivery.astro`).
- Хостинг — Vercel, репозиторий — `RomanBaukin/dym-batumi-landing` (публичный).

## Команды

- `npm run dev` — дев-сервер на http://localhost:4321
- `npm run build` — сборка в `dist/`
- `npm run preview` — просмотр сборки
- `npm run check` — проверка типов (astro check)

## Правила проекта

- Весь контент на русском, цены в лари (₾).
- Работа идёт по этапам из ТЗ: каждый этап — ветка `stage-N-*` и PR в `main`.
- Фото: сырые PNG от Ромы лежат в `raw-photos/` (не в git). Оптимизированные — в `src/assets/`, выводятся через `astro:assets`.
- Любая анимация обязана иметь вариант для `prefers-reduced-motion: reduce`.
- Сторонние скрипты (Leaflet и т.п.) грузятся лениво, только когда нужны: бюджет — Lighthouse mobile ≥ 95.
- Документация Astro: https://docs.astro.build
