// Карта зон доставки. Грузится лениво (см. Delivery.astro) — Leaflet и тайлы не трогают первый экран.
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { business, deliveryZones } from '../data/menu';

// Полигоны приблизительные: для демо важна наглядность, а не кадастровая точность
const shapes: Record<(typeof deliveryZones)[number]['id'], L.LatLngExpression[]> = {
  // прибрежная полоса: Махинджаури на севере — Гонио на юге
  outer: [
    [41.685, 41.695], [41.69, 41.715], [41.672, 41.72], [41.655, 41.69], [41.64, 41.672], [41.6, 41.645],
    [41.57, 41.61], [41.548, 41.595], [41.545, 41.575], [41.56, 41.568], [41.59, 41.585], [41.62, 41.59],
    [41.66, 41.615], [41.668, 41.65], [41.678, 41.675],
  ],
  // Новый бульвар, Химшиашвили — до аэропорта
  new: [
    [41.66, 41.618], [41.66, 41.652], [41.65, 41.668], [41.628, 41.66], [41.605, 41.64], [41.598, 41.61],
    [41.612, 41.592], [41.635, 41.6],
  ],
  // Старый Батуми и центр
  center: [
    [41.657, 41.625], [41.657, 41.65], [41.648, 41.662], [41.628, 41.65], [41.626, 41.628], [41.64, 41.618],
  ],
};

const RESTAURANT: L.LatLngExpression = [41.647, 41.638];

export function mountMap(el: HTMLElement) {
  const css = getComputedStyle(document.documentElement);
  const color = (name: string) => css.getPropertyValue(`--color-${name}`).trim();

  const map = L.map(el, {
    center: [41.625, 41.645],
    zoom: 12,
    scrollWheelZoom: false, // не перехватываем прокрутку страницы
    dragging: !L.Browser.mobile, // на телефоне страница листается пальцем, карта — щипком
    attributionControl: true,
    zoomSnap: 0.25, // дробный зум — зоны плотнее заполняют рамку
  });

  // Стандартные тайлы OSM (без ключа, по их tile usage policy); тёмными их делает CSS-фильтр в Delivery.astro
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // от дальней зоны к ближней, чтобы центральная лежала сверху
  const layers = [...deliveryZones].reverse().map((z) =>
    L.polygon(shapes[z.id], {
      color: color(z.color),
      weight: 2,
      fillColor: color(z.color),
      fillOpacity: 0.16,
    })
      .bindPopup(
        `<strong>${z.name}</strong><br>${z.time}, доставка ${z.fee}&nbsp;₾<br>бесплатно от ${z.freeFrom}&nbsp;₾`,
      )
      .addTo(map),
  );

  L.marker(RESTAURANT, {
    icon: L.divIcon({
      className: 'map-pin',
      html: '<span>ДЫМ</span>',
      iconSize: [64, 32],
      iconAnchor: [32, 32],
    }),
    title: business.address,
  })
    .bindPopup(`<strong>ДЫМ</strong><br>${business.address}`)
    .addTo(map);

  map.fitBounds(L.featureGroup(layers).getBounds(), { padding: [12, 12] });
}
