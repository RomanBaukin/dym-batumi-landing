// Единый источник данных меню: из него рендерятся карточки, а на этапе 4 — считается корзина.

export type Category = 'burgers' | 'sides' | 'drinks';

export interface MenuItem {
  id: string;
  category: Category;
  name: string;
  description: string;
  /** граммы для еды, миллилитры для напитков */
  size: string;
  price: number;
  /** имя файла фото из prompts.md (без расширения) */
  photo: string;
  tags?: Array<'hit' | 'spicy' | 'local'>;
}

export const categories: Array<{ id: Category; label: string }> = [
  { id: 'burgers', label: 'Бургеры' },
  { id: 'sides', label: 'Закуски' },
  { id: 'drinks', label: 'Напитки' },
];

export const tagLabels = {
  hit: 'Хит',
  spicy: 'Острый',
  local: 'Батумский',
} as const;

export const menu: MenuItem[] = [
  {
    id: 'classic',
    category: 'burgers',
    name: 'Классика дыма',
    description: 'Две котлеты по 90 г, чеддер, маринованный лук, огурцы, соус «Дым», бриошь.',
    size: '290 г',
    price: 18,
    photo: 'burger-classic',
    tags: ['hit'],
  },
  {
    id: 'fat',
    category: 'burgers',
    name: 'Жир не враг',
    description: 'Три котлеты, тройной чеддер, хрустящий бекон и соус «Дым». Для тех, кто не считает.',
    size: '420 г',
    price: 26,
    photo: 'burger-fat',
  },
  {
    id: 'adjarian',
    category: 'burgers',
    name: 'Аджарский',
    description: 'Котлета, тянущийся сулугуни, яйцо с жидким желтком, томлёный лук. Как аджарули, только бургер.',
    size: '310 г',
    price: 22,
    photo: 'burger-adjarian',
    tags: ['local'],
  },
  {
    id: 'suluguni',
    category: 'burgers',
    name: 'Сулугуни-аджика',
    description: 'Две котлеты, жареный сулугуни, майонез с аджикой, халапеньо.',
    size: '320 г',
    price: 21,
    photo: 'burger-suluguni',
    tags: ['local', 'spicy'],
  },
  {
    id: 'tkemali',
    category: 'burgers',
    name: 'Ткемали BBQ',
    description: 'Котлета, чеддер, бекон, BBQ-соус на сливовом ткемали, хрустящий лук.',
    size: '300 г',
    price: 22,
    photo: 'burger-tkemali',
    tags: ['local'],
  },
  {
    id: 'mushroom',
    category: 'burgers',
    name: 'Грибной дым',
    description: 'Котлета, жареные шампиньоны, швейцарский сыр, трюфельный майонез.',
    size: '290 г',
    price: 20,
    photo: 'burger-mushroom',
  },
  {
    id: 'fries',
    category: 'sides',
    name: 'Фри с паприкой',
    description: 'Толстая фри в кожуре, копчёная паприка, морская соль.',
    size: '180 г',
    price: 7,
    photo: 'side-fries',
  },
  {
    id: 'loaded-fries',
    category: 'sides',
    name: 'Фри по-батумски',
    description: 'Фри под расплавленным сулугуни, аджика и кинза.',
    size: '260 г',
    price: 11,
    photo: 'side-loaded-fries',
    tags: ['local', 'spicy'],
  },
  {
    id: 'onion-rings',
    category: 'sides',
    name: 'Луковые кольца',
    description: 'Лук в пивном кляре и соус «Дым», чтобы макать.',
    size: '160 г',
    price: 8,
    photo: 'side-onion-rings',
  },
  {
    id: 'tarragon',
    category: 'drinks',
    name: 'Лимонад «Тархун»',
    description: 'Домашний, на свежем эстрагоне и лимоне.',
    size: '400 мл',
    price: 6,
    photo: 'drink-tarragon',
    tags: ['local'],
  },
  {
    id: 'milkshake',
    category: 'drinks',
    name: 'Ванильный милкшейк',
    description: 'Густой, на пломбире со стручковой ванилью.',
    size: '400 мл',
    price: 9,
    photo: 'drink-milkshake',
  },
  {
    id: 'peach-tea',
    category: 'drinks',
    name: 'Холодный чай с персиком',
    description: 'Чёрный чай, свежий персик и мята.',
    size: '400 мл',
    price: 6,
    photo: 'drink-peach-tea',
  },
];

export const combo = {
  id: 'combo-smoke',
  name: 'Дымный сет',
  items: ['classic', 'fries', 'tarragon'],
  price: 27,
};

/** Полная цена позиций комбо по отдельности */
export const comboFullPrice = combo.items.reduce(
  (sum, id) => sum + (menu.find((m) => m.id === id)?.price ?? 0),
  0,
);

export const deliveryZones = [
  {
    id: 'center',
    name: 'Центр и Старый Батуми',
    time: '30 минут',
    fee: 3,
    freeFrom: 30,
    color: 'ember',
  },
  {
    id: 'new',
    name: 'Новый бульвар и Химшиашвили',
    time: '40 минут',
    fee: 5,
    freeFrom: 40,
    color: 'cheddar',
  },
  {
    id: 'outer',
    name: 'Махинджаури и Гонио',
    time: '60 минут',
    fee: 8,
    freeFrom: 60,
    color: 'brioche',
  },
] as const;

export const business = {
  address: 'ул. Горгиладзе, 47, Батуми',
  hours: 'Каждый день с 11:00 до 02:00',
  lastOrder: '01:30',
  minOrder: 15,
};
