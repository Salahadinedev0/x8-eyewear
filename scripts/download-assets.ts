#!/usr/bin/env tsx
/**
 * Asset Download Script for X8 Eyewear
 * Downloads placeholder images and video from the original site for local development
 */

import fs from 'fs/promises';
import path from 'path';
import { collections } from '../src/lib/data/collections';

const BASE_URL = 'https://x8.adencys.com';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const IMAGE_DIRS = [
  'images/collections',
  'images/products',
  'video',
] as const;

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function downloadFile(url: string, destPath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  ⚠️  ${url} - ${response.status} ${response.statusText}`);
      return false;
    }
    const buffer = await response.arrayBuffer();
    await fs.writeFile(destPath, Buffer.from(buffer));
    console.log(`  ✅ ${path.basename(destPath)}`);
    return true;
  } catch (error) {
    console.log(`  ❌ ${url} - ${error}`);
    return false;
  }
}

async function createPlaceholderImage(destPath: string, width: number, height: number, text: string, bgColor = '#0a0a0a', textColor = '#d4a853') {
  // Create a simple SVG placeholder
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="${textColor}">
    ${text}
  </text>
</svg>`.trim();

  await fs.writeFile(destPath, svg);
  console.log(`  📝 Created placeholder: ${path.basename(destPath)}`);
}

async function createPlaceholderVideo(destPath: string) {
  // Create a minimal MP4 placeholder (actually just a note file)
  const note = `Placeholder for hero video.
Download the actual hero.mp4 from https://x8.adencys.com/video/hero.mp4
Place it at: public/video/hero.mp4
Recommended: 1920x1080, 15-20s, <10MB, seamless loop`;
  await fs.writeFile(destPath.replace('.mp4', '.txt'), note);
  console.log(`  📝 Created video placeholder note`);
}

async function main() {
  console.log('📦 X8 Eyewear Asset Download Script\n');

  // Ensure directories exist
  for (const dir of IMAGE_DIRS) {
    await ensureDir(path.join(PUBLIC_DIR, dir));
  }

  // Download hero video
  console.log('\n🎬 Hero Video:');
  await createPlaceholderVideo(path.join(PUBLIC_DIR, 'video/hero.mp4'));

  // Download FWA ribbon
  console.log('\n🏆 FWA Ribbon:');
  await createPlaceholderImage(
    path.join(PUBLIC_DIR, 'images/fwa-ribbon.png'),
    120, 120,
    'FWA',
    '#0a0a0a', '#d4a853'
  );

  // Download hero poster
  console.log('\n🖼️  Hero Poster:');
  await createPlaceholderImage(
    path.join(PUBLIC_DIR, 'images/hero-poster.jpg'),
    1920, 1080,
    'X8 Eyewear - Hero Poster'
  );

  // Download collection hero images
  console.log('\n📂 Collection Heroes:');
  for (const collection of collections) {
    await createPlaceholderImage(
      path.join(PUBLIC_DIR, `images/collections/${collection.id}-hero.jpg`),
      800, 1000,
      collection.label
    );
  }

  // Download product images
  console.log('\n🕶️  Product Images:');
  for (const collection of collections) {
    const collectionDir = path.join(PUBLIC_DIR, `images/products/${collection.id}`);
    await ensureDir(collectionDir);

    const prefix = collection.id.replace('-', '').toUpperCase();

    for (const model of collection.models) {
      const modelNum = model.padStart(3, '0');

      for (const variant of ['001', '002', '003', '004']) {
        // Primary
        await createPlaceholderImage(
          path.join(collectionDir, `${prefix}-${modelNum}-${variant}-1.jpg`),
          800, 1000,
          `${collection.label} ${model} v${variant}`
        );
        // Alternate
        await createPlaceholderImage(
          path.join(collectionDir, `${prefix}-${modelNum}-${variant}-2.jpg`),
          800, 1000,
          `${collection.label} ${model} v${variant} (alt)`
        );
        // Angles 3, 4
        for (const angle of [3, 4]) {
          await createPlaceholderImage(
            path.join(collectionDir, `${prefix}-${modelNum}-${variant}-${angle}.jpg`),
            800, 1000,
            `${collection.label} ${model} angle ${angle}`
          );
        }
        // Detail
        await createPlaceholderImage(
          path.join(collectionDir, `${prefix}-${modelNum}-${variant}-6.jpg`),
          1200, 1200,
          `${collection.label} ${model} detail`
        );
      }
    }
  }

  // Download OG image
  console.log('\n📱 Social Images:');
  await createPlaceholderImage(
    path.join(PUBLIC_DIR, 'images/og-default.jpg'),
    1200, 630,
    'X8 Eyewear'
  );

  // Create favicon placeholders
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0a0a0a"/><text x="16" y="22" text-anchor="middle" font-family="system-ui" font-weight="bold" font-size="18" fill="#d4a853">X8</text></svg>`;
  await fs.writeFile(path.join(PUBLIC_DIR, 'favicon.svg'), faviconSvg);
  console.log(`  📝 Created favicon.svg`);

  // Create site.webmanifest
  const manifest = {
    name: 'X8 Eyewear',
    short_name: 'X8',
    description: 'Meticulously crafted titanium eyewear',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
  await fs.writeFile(path.join(PUBLIC_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log(`  📝 Created site.webmanifest`);

  console.log('\n✨ Done! Placeholder assets created in public/');
  console.log('\n📝 Next steps:');
  console.log('  1. Replace placeholder images with actual assets from x8.adencys.com');
  console.log('  2. Download hero.mp4 from the original site');
  console.log('  3. Run: npm run dev');
}

main().catch(console.error);