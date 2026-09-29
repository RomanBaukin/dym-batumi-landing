"""
Готовит сырые фото из raw-photos/ (PNG из ChatGPT, по 2–3 МБ) к сборке.

Запуск (нужен Pillow: pip install pillow):
    python scripts/prepare-photos.py

Результат — в src/assets/photos/. Это ещё не то, что уходит в браузер:
финальные AVIF/WebP нужных размеров делает astro:assets при сборке.
Здесь только уменьшаем исходники до разумного размера, чтобы не держать
в git 50 МБ PNG, и приводим их к нужной форме:
  - hero: кадрируем вокруг бургера (слева в исходнике пустое место под текст);
  - слои взрыв-схемы: обрезаем прозрачные поля, чтобы высота слоя = высота картинки;
  - меню и аватары: просто уменьшаем.
"""

import os

from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
SRC = os.path.join(ROOT, 'raw-photos')
OUT = os.path.join(ROOT, 'src', 'assets', 'photos')

MENU = [
    'burger-classic', 'burger-fat', 'burger-adjarian', 'burger-suluguni', 'burger-tkemali', 'burger-mushroom',
    'side-fries', 'side-loaded-fries', 'side-onion-rings',
    'drink-tarragon', 'drink-milkshake', 'drink-peach-tea',
]
LAYERS = ['layer-bun-top', 'layer-onion', 'layer-patty-cheese', 'layer-sauce', 'layer-bun-bottom']
AVATARS = ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4']


def load(name):
    return Image.open(os.path.join(SRC, f'{name}.png'))


def save_jpg(im, name, size):
    im = im.convert('RGB')
    im.thumbnail((size, size), Image.LANCZOS)
    path = os.path.join(OUT, f'{name}.jpg')
    im.save(path, quality=88, optimize=True, progressive=True)
    report(path, im)


def report(path, im):
    print(f'{os.path.basename(path)}: {im.width}x{im.height}, {os.path.getsize(path) // 1024} КБ')


def hero():
    # Исходник 1536×1024, бургер в правой трети. Берём правые ~70% кадра —
    # бургер с доской и дымом вокруг; края потом растворяются маской в CSS.
    im = load('hero-burger').convert('RGB')
    im = im.crop((460, 60, 1536, 1024))
    path = os.path.join(OUT, 'hero-burger.jpg')
    im.save(path, quality=90, optimize=True, progressive=True)
    report(path, im)


def layer(name):
    im = load(name).convert('RGBA')
    # почти прозрачную «пыль» по краям не считаем содержимым
    bbox = im.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
    im = im.crop(bbox)
    im.thumbnail((900, 900), Image.LANCZOS)
    path = os.path.join(OUT, f'{name}.webp')
    im.save(path, quality=92, method=6)
    report(path, im)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    hero()
    for n in LAYERS:
        layer(n)
    for n in MENU:
        save_jpg(load(n), n, 960)
    for n in AVATARS:
        # в кружке 56 px плечи не нужны — берём квадрат вокруг лица
        save_jpg(load(n).crop((188, 40, 1066, 918)), n, 240)
