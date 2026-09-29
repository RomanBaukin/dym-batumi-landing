// «Полёт в корзину»: копия картинки товара улетает по дуге в кнопку корзины в хедере.
// Дугу дают две разные кривые: по X копия разгоняется медленно, по Y — сразу взлетает.

const DURATION = 700;

/** Откуда лететь: у кнопки может быть data-fly-from, иначе — фото карточки или картинка сета */
export function flySource(btn: HTMLElement): HTMLElement | null {
  if (btn.dataset.flyFrom) return document.querySelector(btn.dataset.flyFrom);
  return btn.closest('.card, .combo')?.querySelector<HTMLElement>('.card-photo, .combo-visual') ?? null;
}

export function flyToCart(source: HTMLElement | null): Promise<void> {
  const target = document.querySelector<HTMLElement>('header [data-cart-button]');
  if (!source || !target || matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();

  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  // источник уехал за экран — лететь неоткуда
  if (from.bottom < 0 || from.top > innerHeight || to.width === 0) return Promise.resolve();

  const w = Math.min(from.width, 180);
  const h = from.height * (w / from.width);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  const outer = document.createElement('div');
  Object.assign(outer.style, {
    position: 'fixed',
    left: `${from.left + from.width / 2 - w / 2}px`,
    top: `${from.top + from.height / 2 - h / 2}px`,
    width: `${w}px`,
    height: `${h}px`,
    zIndex: '70',
    pointerEvents: 'none',
  });
  outer.setAttribute('aria-hidden', 'true');

  const inner = document.createElement('div');
  Object.assign(inner.style, {
    width: '100%',
    height: '100%',
    // свечение «жара», чтобы полёт читался даже на тёмном фоне
    filter: 'drop-shadow(0 0 14px rgb(255 91 31 / 0.7))',
  });

  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute('style');
  Object.assign(clone.style, { width: '100%', height: '100%', margin: '0' });
  inner.append(clone);
  outer.append(inner);
  document.body.append(outer);

  outer.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${dx}px)` }], {
    duration: DURATION,
    easing: 'cubic-bezier(0.5, 0, 0.9, 0.6)',
    fill: 'forwards',
  });
  const flight = inner.animate(
    [
      { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${dy}px) scale(0.12) rotate(-25deg)`, opacity: 0.7 },
    ],
    { duration: DURATION, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)', fill: 'forwards' },
  );

  return flight.finished.then(
    () => outer.remove(),
    () => outer.remove(),
  );
}
