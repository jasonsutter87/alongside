// Real nearby PUBLIC places from OpenStreetMap's Overpass API.
// Free, no API key, no billing. We only ever query PUBLIC categories
// (cafes, parks, bars, trails, gyms) — never anything residential.

export type Place = { name: string; kind: string };

const ENDPOINT = 'https://overpass-api.de/api/interpreter';

export async function nearbyPlaces(lat: number, lng: number, radius = 3000): Promise<Place[]> {
  const q = `[out:json][timeout:20];(
    node["amenity"~"^(cafe|bar|pub|restaurant|biergarten)$"](around:${radius},${lat},${lng});
    node["leisure"~"^(park|fitness_centre|garden|sports_centre|pitch)$"](around:${radius},${lat},${lng});
    way["leisure"~"^(park|sports_centre|pitch)$"](around:${radius},${lat},${lng});
    node["natural"="beach"](around:${radius},${lat},${lng});
    node["shop"="coffee"](around:${radius},${lat},${lng});
    node["tourism"~"^(museum|gallery)$"](around:${radius},${lat},${lng});
  );out center 60;`;

  // Overpass returns 406 without a User-Agent — RN fetch doesn't send an acceptable one, so set it explicitly.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 18000);
  let json: any;
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Alongside/1.0 (nearby-places)',
        Accept: 'application/json',
      },
      body: 'data=' + encodeURIComponent(q),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error('overpass ' + res.status);
    json = await res.json();
  } finally {
    clearTimeout(timer);
  }

  const seen = new Set<string>();
  const out: Place[] = [];
  for (const el of json.elements || []) {
    const t = el.tags;
    const name: string | undefined = t?.name;
    // only real venue categories (skip boundaries / districts that slip in)
    const kind = t && (t.amenity || t.leisure || t.natural || t.shop || t.tourism);
    if (!name || !kind || seen.has(name) || /historic district|county|township/i.test(name)) continue;
    seen.add(name);
    out.push({ name, kind });
    if (out.length >= 8) break;
  }
  return out;
}
