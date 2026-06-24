// Real nearby PUBLIC places from OpenStreetMap's Overpass API.
// Free, no API key, no billing. We only ever query PUBLIC categories
// (cafes, parks, bars, trails, gyms) — never anything residential.

export type Place = { name: string; kind: string };

const ENDPOINT = 'https://overpass-api.de/api/interpreter';

export async function nearbyPlaces(lat: number, lng: number, radius = 1600): Promise<Place[]> {
  const q = `[out:json][timeout:20];(
    node["amenity"~"^(cafe|bar|pub|restaurant|biergarten)$"](around:${radius},${lat},${lng});
    node["leisure"~"^(park|fitness_centre|garden|sports_centre|pitch)$"](around:${radius},${lat},${lng});
    way["leisure"~"^(park|sports_centre|pitch)$"](around:${radius},${lat},${lng});
    node["natural"="beach"](around:${radius},${lat},${lng});
    node["shop"="coffee"](around:${radius},${lat},${lng});
    node["tourism"~"^(museum|gallery)$"](around:${radius},${lat},${lng});
  );out center 60;`;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'data=' + encodeURIComponent(q),
  });
  if (!res.ok) throw new Error('overpass ' + res.status);
  const json = await res.json();

  const seen = new Set<string>();
  const out: Place[] = [];
  for (const el of json.elements || []) {
    const name: string | undefined = el.tags?.name;
    if (!name || seen.has(name)) continue;
    seen.add(name);
    const t = el.tags;
    const kind = t.amenity || t.leisure || t.natural || t.shop || t.tourism || 'spot';
    out.push({ name, kind });
    if (out.length >= 8) break;
  }
  return out;
}
