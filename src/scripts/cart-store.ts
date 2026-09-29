// Состояние корзины и расчёт суммы. Без DOM — только данные.
import { business, combo, deliveryZones, menu } from '../data/menu';

export type ZoneId = (typeof deliveryZones)[number]['id'];
export type Mode = 'delivery' | 'pickup';

interface CatalogItem {
  id: string;
  name: string;
  price: number;
  isBurger: boolean;
}

export interface Line extends CatalogItem {
  qty: number;
}

export const catalog = new Map<string, CatalogItem>([
  ...menu.map((m) => [m.id, { id: m.id, name: m.name, price: m.price, isBurger: m.category === 'burgers' }] as const),
  [combo.id, { id: combo.id, name: combo.name, price: combo.price, isBurger: false }],
]);

const STORAGE_KEY = 'dym-cart-v1';
type Stored = Record<string, number>;

function load(): Stored {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    // выкидываем позиции, которых больше нет в меню
    return Object.fromEntries(
      Object.entries(raw).filter(([id, qty]) => catalog.has(id) && Number.isInteger(qty) && (qty as number) > 0),
    ) as Stored;
  } catch {
    return {};
  }
}

let state: Stored = load();
const listeners = new Set<() => void>();

function commit() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // приватный режим и т.п. — корзина просто не переживёт перезагрузку
  }
  listeners.forEach((fn) => fn());
}

// корзина общая для всех вкладок
window.addEventListener('storage', (e) => {
  if (e.key !== STORAGE_KEY) return;
  state = load();
  listeners.forEach((fn) => fn());
});

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function add(id: string) {
  if (!catalog.has(id)) return;
  state = { ...state, [id]: (state[id] ?? 0) + 1 };
  commit();
}

export function setQty(id: string, qty: number) {
  const next = { ...state };
  if (qty > 0) next[id] = Math.min(qty, 99);
  else delete next[id];
  state = next;
  commit();
}

export function clear() {
  state = {};
  commit();
}

export function lines(): Line[] {
  return Object.entries(state).map(([id, qty]) => ({ ...catalog.get(id)!, qty }));
}

export function count() {
  return Object.values(state).reduce((a, b) => a + b, 0);
}

/** «Жирный вторник» считается по времени Батуми. ?tuesday=1 в адресе включает его для демонстрации. */
export function isTuesday() {
  if (new URLSearchParams(location.search).has('tuesday')) return true;
  const day = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tbilisi', weekday: 'short' }).format(new Date());
  return day === 'Tue';
}

export interface Totals {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  /** сколько не хватает до минимального заказа */
  missing: number;
  /** сколько добавить до бесплатной доставки в выбранной зоне */
  toFreeDelivery: number;
}

export function totals(mode: Mode = 'pickup', zoneId?: ZoneId): Totals {
  const ls = lines();
  const subtotal = ls.reduce((sum, l) => sum + l.price * l.qty, 0);

  // Второй бургер за полцену: скидка на самый дешёвый из бургеров, если их хотя бы два
  let discount = 0;
  if (isTuesday()) {
    const burgerPrices = ls.flatMap((l) => (l.isBurger ? Array<number>(l.qty).fill(l.price) : []));
    if (burgerPrices.length >= 2) discount = Math.min(...burgerPrices) / 2;
  }

  const afterDiscount = subtotal - discount;
  const zone = deliveryZones.find((z) => z.id === zoneId);
  let delivery = 0;
  let toFreeDelivery = 0;
  if (mode === 'delivery' && zone) {
    delivery = afterDiscount >= zone.freeFrom ? 0 : zone.fee;
    toFreeDelivery = Math.max(0, zone.freeFrom - afterDiscount);
  }

  return {
    subtotal,
    discount,
    delivery,
    total: afterDiscount + delivery,
    missing: Math.max(0, business.minOrder - afterDiscount),
    toFreeDelivery,
  };
}

const money = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });
export const formatPrice = (n: number) => `${money.format(n)} ₾`;

export function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
