import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

// Original vector monogram. PNG/ICO fallbacks use the default light-tab artwork.
const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
for (const size of [16, 32, 48, 180]) {
  const output = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`;
  await sharp(svg).resize(size, size).png().toFile(new URL(`../public/${output}`, import.meta.url).pathname);
}
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(svg).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((image, i) => {
  const start = 6 + i * 16;
  header[start] = sizes[i];
  header[start + 1] = sizes[i];
  header.writeUInt16LE(1, start + 4);
  header.writeUInt16LE(32, start + 6);
  header.writeUInt32LE(image.length, start + 8);
  header.writeUInt32LE(offset, start + 12);
  offset += image.length;
});
await writeFile(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, ...images]));
console.log('Generated 16/32/48px favicon fallbacks and 180px touch icon.');
