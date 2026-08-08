/**
 * Lightweight Lottie JSON recolor for teaching.
 * Walks layers/shapes and rewrites solid fill (ty === "fl") / stroke (ty === "st") colors.
 * Not a full design-token engine — good enough for demos and simple icons.
 */

export type Rgba01 = [number, number, number, number];

/** Hex like #0d9488 or #0d9488ff → [r,g,b,a] in 0–1 */
export function hexToRgba01(hex: string): Rgba01 {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length === 6) h += "ff";
  const n = parseInt(h, 16);
  if (Number.isNaN(n) || h.length !== 8) return [0.05, 0.58, 0.53, 1];
  return [
    ((n >> 24) & 255) / 255,
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255,
  ];
}

function isColorArray(v: unknown): v is number[] {
  return Array.isArray(v) && v.length >= 3 && v.every((x) => typeof x === "number");
}

function recolorColorProp(c: unknown, rgba: Rgba01): void {
  if (!c || typeof c !== "object") return;
  const obj = c as { a?: number; k?: unknown };
  // Static color: { a: 0, k: [r,g,b,a] }
  if (isColorArray(obj.k)) {
    obj.k = [...rgba];
    return;
  }
  // Keyframed: { a: 1, k: [ { t, s: [r,g,b,a], ... }, ... ] }
  if (Array.isArray(obj.k)) {
    for (const kf of obj.k) {
      if (kf && typeof kf === "object" && isColorArray((kf as { s?: unknown }).s)) {
        (kf as { s: number[] }).s = [...rgba];
      }
    }
  }
}

function walkShapes(shapes: unknown, rgba: Rgba01): void {
  if (!Array.isArray(shapes)) return;
  for (const sh of shapes) {
    if (!sh || typeof sh !== "object") continue;
    const s = sh as { ty?: string; c?: unknown; it?: unknown };
    if (s.ty === "fl" || s.ty === "st") {
      recolorColorProp(s.c, rgba);
    }
    if (s.it) walkShapes(s.it, rgba);
  }
}

function walkLayers(layers: unknown, rgba: Rgba01): void {
  if (!Array.isArray(layers)) return;
  for (const layer of layers) {
    if (!layer || typeof layer !== "object") continue;
    const L = layer as { shapes?: unknown; layers?: unknown };
    if (L.shapes) walkShapes(L.shapes, rgba);
    // precomp nesting (rare in our assets)
    if (L.layers) walkLayers(L.layers, rgba);
  }
}

/** Deep-clone animation JSON and paint solid fills/strokes with rgba 0–1. */
export function recolorLottie(data: unknown, rgba: Rgba01): unknown {
  const clone = structuredClone(data) as {
    layers?: unknown;
    assets?: Array<{ layers?: unknown }>;
  };
  walkLayers(clone.layers, rgba);
  if (Array.isArray(clone.assets)) {
    for (const asset of clone.assets) {
      if (asset?.layers) walkLayers(asset.layers, rgba);
    }
  }
  return clone;
}

export function recolorLottieHex(data: unknown, hex: string): unknown {
  return recolorLottie(data, hexToRgba01(hex));
}
