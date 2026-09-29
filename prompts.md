# Промпты для фото — ChatGPT

Промпты на английском: генератор точнее понимает детали освещения и ракурса. Пояснения — на русском.

## Как генерировать

1. **Всё в одном чате ChatGPT.** Начни с hero (§1). Когда он понравится, остальные генерируй в том же чате с припиской *«Keep the exact same visual style, lighting and color grading as the hero image»*. Так фото будут выглядеть одной съёмкой.
2. **Формат** указан у каждого промпта: квадрат 1024×1024, горизонталь 1536×1024 или вертикаль 1024×1536.
3. **Не нравится — перегенерируй**, не правь руками. Лучше 3 попытки на кадр, чем разнобой по стилю.
4. **Куда класть:** папка `raw-photos/` в корне проекта (она в `.gitignore`), имя файла — как в заголовке промпта (например `burger-classic.png`). Дальше я сам оптимизирую и встрою.

## Общий стиль

Этот блок уже вшит в каждый промпт ниже, отдельно его вставлять не нужно:

> Moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light from behind, wisps of smoke, glistening juicy textures, shallow depth of field, shot on 85mm, professional advertising quality, no text, no logos, no hands.

---

## 1. Hero

### `hero-burger.png` — горизонталь 1536×1024

Фирменный «Классика дыма» — главный кадр сайта. Бургер смещён вправо, слева пустое тёмное место под заголовок.

```
Hero shot of a double smash burger: two thin crispy-edged beef patties with lacy caramelized edges, melted cheddar dripping down the sides, pickled red onion, glossy toasted brioche bun with sesame. The burger stands on a dark slate board, positioned in the right third of the frame; the left two thirds is empty dark space with drifting smoke. Eye-level angle, slightly low. Moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light from behind, wisps of smoke, glistening juicy textures, shallow depth of field, shot on 85mm, professional advertising quality, no text, no logos, no hands. Landscape 1536x1024.
```

---

## 2. Слои для взрыв-схемы

**Важно:** все слои — строго сбоку, на уровне глаз, одинаковой ширины, **на прозрачном фоне (PNG)**. Если ChatGPT сделал фон не прозрачным — попроси: *«Same image, but with a fully transparent background, PNG»*.

Общая приписка для слоёв (уже вшита):

> Isolated on a fully transparent background, PNG, strict side view at eye level, centered, filling 80% of the frame width, warm studio lighting from the upper left, photorealistic, no shadow, no text.

### `layer-bun-top.png` — квадрат 1024×1024

```
Top half of a glossy toasted brioche burger bun with sesame seeds, dome shape. Isolated on a fully transparent background, PNG, strict side view at eye level, centered, filling 80% of the frame width, warm studio lighting from the upper left, photorealistic, no shadow, no text. Square 1024x1024.
```

### `layer-onion.png` — квадрат 1024×1024

```
A thin loose layer of pickled red onion rings and a few dill pickle slices, as it would sit inside a burger, flat horizontal layer. Isolated on a fully transparent background, PNG, strict side view at eye level, centered, filling 80% of the frame width, warm studio lighting from the upper left, photorealistic, no shadow, no text. Square 1024x1024.
```

### `layer-patty-cheese.png` — квадрат 1024×1024

Используем дважды (двойная котлета).

```
A single thin smash burger beef patty with crispy lacy caramelized edges, a slice of melted cheddar draped over it and dripping down the sides. Isolated on a fully transparent background, PNG, strict side view at eye level, centered, filling 80% of the frame width, warm studio lighting from the upper left, photorealistic, no shadow, no text. Square 1024x1024.
```

### `layer-sauce.png` — квадрат 1024×1024

```
A thick glossy dollop of orange burger sauce spread in a flat horizontal layer, slightly dripping at the edges, as it would sit inside a burger. Isolated on a fully transparent background, PNG, strict side view at eye level, centered, filling 80% of the frame width, warm studio lighting from the upper left, photorealistic, no shadow, no text. Square 1024x1024.
```

### `layer-bun-bottom.png` — квадрат 1024×1024

```
Bottom half of a toasted brioche burger bun, flat cut side up, golden toasted surface. Isolated on a fully transparent background, PNG, strict side view at eye level, centered, filling 80% of the frame width, warm studio lighting from the upper left, photorealistic, no shadow, no text. Square 1024x1024.
```

---

## 3. Меню

Все карточки — квадрат 1024×1024, одинаковый ракурс (3/4 сверху, ~30°), продукт по центру на тёмной сланцевой доске. Общая часть (уже вшита):

> Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.

### Бургеры

| Файл | Позиция | Цена |
|---|---|---|
| `burger-classic.png` | Классика дыма | 18 ₾ |
| `burger-fat.png` | Жир не враг | 26 ₾ |
| `burger-adjarian.png` | Аджарский | 22 ₾ |
| `burger-suluguni.png` | Сулугуни-аджика | 21 ₾ |
| `burger-tkemali.png` | Ткемали BBQ | 22 ₾ |
| `burger-mushroom.png` | Грибной дым | 20 ₾ |

**`burger-classic.png`** — Классика дыма
```
A double smash burger with two thin crispy-edged beef patties, melted cheddar, pickled red onion, orange burger sauce, glossy sesame brioche bun. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`burger-fat.png`** — Жир не враг
```
An outrageously tall triple smash burger: three crispy-edged beef patties, three layers of melted cheddar oozing down, thick crispy bacon strips, glossy brioche bun barely holding it together. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`burger-adjarian.png`** — Аджарский
```
A smash burger with a crispy beef patty, melted stretchy suluguni cheese, a fried egg with a runny golden yolk, slow-cooked caramelized onions, soft brioche bun; the yolk is dripping slightly. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`burger-suluguni.png`** — Сулугуни-аджика
```
A double smash burger with a thick slice of pan-fried golden suluguni cheese, bright red spicy adjika mayo, sliced jalapeños, dark brioche bun. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`burger-tkemali.png`** — Ткемали BBQ
```
A smash burger with crispy beef patty, melted cheddar, crispy bacon, glossy dark plum BBQ sauce dripping, a pile of crispy fried onion strings on top, brioche bun. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`burger-mushroom.png`** — Грибной дым
```
A smash burger with crispy beef patty, a generous pile of pan-seared glossy mushrooms, melted Swiss cheese, a drizzle of creamy truffle mayo, brioche bun. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

### Сайды

| Файл | Позиция | Цена |
|---|---|---|
| `side-fries.png` | Фри с паприкой | 7 ₾ |
| `side-loaded-fries.png` | Фри по-батумски (сулугуни + аджика) | 11 ₾ |
| `side-onion-rings.png` | Луковые кольца | 8 ₾ |

**`side-fries.png`**
```
A generous portion of crispy golden skin-on french fries dusted with smoked paprika and flaky salt, in a small black metal basket lined with parchment. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`side-loaded-fries.png`**
```
Loaded french fries covered with melted stretchy suluguni cheese, drizzled with bright red adjika sauce and sprinkled with fresh cilantro, in a small black cast-iron skillet. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`side-onion-rings.png`**
```
A stack of thick golden beer-battered onion rings with a small bowl of orange dipping sauce next to them. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, subtle smoke, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

### Напитки

| Файл | Позиция | Цена |
|---|---|---|
| `drink-tarragon.png` | Лимонад «Тархун» | 6 ₾ |
| `drink-milkshake.png` | Ванильный милкшейк | 9 ₾ |
| `drink-peach-tea.png` | Холодный чай с персиком | 6 ₾ |

**`drink-tarragon.png`**
```
A tall glass of bright emerald green tarragon lemonade with ice cubes, condensation droplets on the glass, a sprig of fresh tarragon and a lemon slice. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`drink-milkshake.png`**
```
A thick vanilla milkshake in a tall retro glass, topped with a swirl of whipped cream and vanilla bean specks, a paper straw, drips running down the side of the glass. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

**`drink-peach-tea.png`**
```
A tall glass of amber iced peach tea with ice cubes, fresh peach slices and a mint leaf, condensation on the glass. Centered on a dark slate board, three-quarter angle from about 30 degrees above, moody dark food photography, charcoal black background, dramatic low-key lighting with warm orange rim light, glistening textures, shallow depth of field, professional advertising quality, no text, no logos, no hands. Square 1024x1024.
```

---

## 4. Аватары для отзывов

Квадрат 1024×1024. Люди вымышленные. Общая часть (уже вшита):

> Casual candid portrait photo, head and shoulders, natural smile, warm evening light, blurred cozy cafe background, realistic, no text. Square 1024x1024.

**`avatar-1.png`**
```
A woman in her late 20s with dark wavy hair, wearing a denim jacket. Casual candid portrait photo, head and shoulders, natural smile, warm evening light, blurred cozy cafe background, realistic, no text. Square 1024x1024.
```

**`avatar-2.png`**
```
A bearded man in his mid 30s with short dark hair, wearing a black t-shirt. Casual candid portrait photo, head and shoulders, natural smile, warm evening light, blurred cozy cafe background, realistic, no text. Square 1024x1024.
```

**`avatar-3.png`**
```
A young man around 22 with curly light-brown hair and freckles, wearing a hoodie. Casual candid portrait photo, head and shoulders, natural smile, warm evening light, blurred cozy cafe background, realistic, no text. Square 1024x1024.
```

**`avatar-4.png`**
```
A woman in her early 40s with short blonde hair and glasses, wearing a light linen shirt. Casual candid portrait photo, head and shoulders, natural smile, warm evening light, blurred cozy cafe background, realistic, no text. Square 1024x1024.
```

---

## Чек-лист

- [x] `hero-burger.png`
- [x] `layer-bun-top.png`
- [x] `layer-onion.png`
- [x] `layer-patty-cheese.png`
- [x] `layer-sauce.png`
- [x] `layer-bun-bottom.png`
- [x] `burger-classic.png`
- [x] `burger-fat.png`
- [x] `burger-adjarian.png`
- [x] `burger-suluguni.png`
- [x] `burger-tkemali.png`
- [x] `burger-mushroom.png`
- [x] `side-fries.png`
- [x] `side-loaded-fries.png`
- [x] `side-onion-rings.png`
- [x] `drink-tarragon.png`
- [x] `drink-milkshake.png`
- [x] `drink-peach-tea.png`
- [x] `avatar-1.png` … `avatar-4.png`

Итого 22 картинки.
