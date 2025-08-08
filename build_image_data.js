// build_image_data.js
// Precompute image coordinates: EXIF GPS first, then Google Vision Landmark fallback.
// Outputs imageData.json used by the front-end (fast, no runtime API calls).

const vision = require('@google-cloud/vision');
const exifr  = require('exifr');
const fs     = require('fs-extra');
const path   = require('path');

const INPUT  = './imagePaths.json';   // your provided JSON (src, category)
const OUTPUT = './imageData.json';    // enriched output used by gallery
const ROOT   = __dirname;

async function readEXIF(filePath) {
  try {
    const buf = await fs.readFile(filePath);
    const gps = await exifr.gps(buf);
    if (gps && Number.isFinite(gps.latitude) && Number.isFinite(gps.longitude)) {
      return { lat: gps.latitude, lng: gps.longitude };
    }
  } catch (_) {}
  return null;
}

async function main() {
  if (!await fs.pathExists(INPUT)) {
    throw new Error(`Missing ${INPUT} in project root.`);
  }

const client = new vision.ImageAnnotatorClient({
  keyFilename: "C:\\keys\\asf-vision-key.json"  // double backslashes on Windows
});


  const images = await fs.readJson(INPUT);
  const existing = (await fs.pathExists(OUTPUT)) ? await fs.readJson(OUTPUT) : [];
  const cache = new Map(existing.map(i => [i.src, i]));

  for (const img of images) {
    // Keep any additional fields you might add later
    const out = cache.get(img.src) ? { ...cache.get(img.src), ...img } : { ...img };

    // Skip if we already have coords cached
    if (out.lat != null && out.lng != null) {
      console.log(`↩️  Cached: ${out.src} (${out.lat}, ${out.lng}) ${out.landmark || ''}`);
      cache.set(out.src, out);
      continue;
    }

    const absPath = path.join(ROOT, img.src);

    // 1) Try EXIF
    const exif = await readEXIF(absPath);
    if (exif) {
      out.lat = exif.lat;
      out.lng = exif.lng;
      out.landmark = out.landmark ?? null;
      console.log(`📍 EXIF: ${out.src} → (${out.lat}, ${out.lng})`);
      cache.set(out.src, out);
      continue;
    }

    // 2) Vision fallback
    try {
      const buf = await fs.readFile(absPath);
      const [res] = await client.landmarkDetection({ image: { content: buf } });
      const lm = res?.landmarkAnnotations?.[0];
      if (lm && lm.locations?.length) {
        out.lat      = lm.locations[0].latLng.latitude;
        out.lng      = lm.locations[0].latLng.longitude;
        out.landmark = lm.description || null;
        console.log(`🗺️  Vision: ${out.src} → ${out.landmark} (${out.lat}, ${out.lng})`);
      } else {
        out.lat = out.lng = null;
        out.landmark = null;
        console.log(`❓ None: ${out.src}`);
      }
    } catch (e) {
      console.warn(`⚠️ Vision error ${out.src}: ${e.message}`);
      out.lat = out.lng = null;
      out.landmark = null;
    }

    cache.set(out.src, out);
  }

  const enriched = Array.from(cache.values());
  await fs.writeJson(OUTPUT, enriched, { spaces: 2 });
  console.log(`✅ Wrote ${OUTPUT} (${enriched.length} items)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
