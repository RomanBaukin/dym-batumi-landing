// Реестр фото из src/assets/photos (их готовит scripts/prepare-photos.py из raw-photos/).
// Компоненты берут картинку по имени из prompts.md — `photo('burger-classic')`.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,webp}', { eager: true });

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), mod.default]),
);

export function photo(name: string): ImageMetadata {
  const img = byName.get(name);
  // лучше упасть на сборке, чем выкатить карточку без фото
  if (!img) throw new Error(`Нет фото «${name}» в src/assets/photos — запусти scripts/prepare-photos.py`);
  return img;
}
