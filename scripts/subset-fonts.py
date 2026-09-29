"""
Урезает шрифты до символов и осей, которые реально используются на лендинге.

Запуск (нужны fonttools и brotli: pip install fonttools brotli):
    python scripts/subset-fonts.py

Исходники берутся из google/fonts (лицензия OFL), результат кладётся
в src/assets/fonts/. Если на странице появятся новые символы — добавьте
их в UNICODES и перезапустите.
"""

import os
import tempfile
import urllib.request

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'fonts')

# ASCII, кириллица с Ё/ё, неразрывный пробел, «», °, ×, дефисы и тире, кавычки, …, №, ₾, минус
UNICODES = (
    'U+0020-007E,U+00A0,U+00AB,U+00B0,U+00BB,U+00D7,U+0401,U+0410-044F,U+0451,'
    'U+2010,U+2011,U+2013,U+2014,U+2018-201E,U+2026,U+2116,U+20BE,U+2212'
)

FONTS = [
    {
        'url': 'https://github.com/google/fonts/raw/main/ofl/sciencegothic/ScienceGothic%5BCTRS,slnt,wdth,wght%5D.ttf',
        'out': 'science-gothic-dym.woff2',
        # контраст и наклон не используем, заголовки — только 700–900
        'limits': {'CTRS': 0, 'slnt': 0, 'wght': (700, 900), 'wdth': (50, 200)},
    },
    {
        'url': 'https://github.com/google/fonts/raw/main/ofl/golostext/GolosText%5Bwght%5D.ttf',
        'out': 'golos-text-dym.woff2',
        'limits': {'wght': (400, 700)},
    },
]


def build(font):
    with tempfile.TemporaryDirectory() as tmp:
        src = os.path.join(tmp, 'src.ttf')
        urllib.request.urlretrieve(font['url'], src)

        opts = subset.Options()
        opts.layout_features = ['kern', 'liga', 'calt', 'locl', 'ccmp', 'mark', 'mkmk']
        opts.name_IDs = ['*']
        opts.notdef_outline = True

        # сначала сабсет, потом инстансинг: в обратном порядке fontTools падает на gvar
        f = TTFont(src, lazy=False)
        subsetter = subset.Subsetter(opts)
        subsetter.populate(unicodes=subset.parse_unicodes(UNICODES))
        subsetter.subset(f)
        mid = os.path.join(tmp, 'mid.ttf')
        f.save(mid)

        f = instancer.instantiateVariableFont(TTFont(mid, lazy=False), font['limits'])
        f.flavor = 'woff2'
        out = os.path.join(OUT, font['out'])
        f.save(out)
        print(f"{font['out']}: {os.path.getsize(out) // 1024} КБ")


if __name__ == '__main__':
    for font in FONTS:
        build(font)
