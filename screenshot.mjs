// screenshot.mjs — Moment Lab screenshot tool
// Usage:
//   node screenshot.mjs http://localhost:3000
//   node screenshot.mjs http://localhost:3000/the-studio.html studio
//   node screenshot.mjs http://localhost:3000 mobile-audit   → 375×812
//   node screenshot.mjs http://localhost:3000 tablet-audit   → 768×1024
//   node screenshot.mjs http://localhost:3000 desktop-audit  → 1440×900
//
// Viewport is inferred from the label prefix: mobile/tablet/desktop.
// Defaults to desktop (1440×900) if no known prefix is found.
// Screenshots save to ./temporary screenshots/screenshot-N.png (auto-incremented).

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2];
const label = process.argv[3];

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  console.error('Example: node screenshot.mjs http://localhost:3000');
  console.error('Example: node screenshot.mjs http://localhost:3000 mobile-audit');
  console.error('Example: node screenshot.mjs http://localhost:3000/the-studio.html studio');
  process.exit(1);
}

// Infer viewport from label prefix — default to desktop
const VIEWPORTS = {
  mobile:  { width: 375,  height: 812,  deviceScaleFactor: 2 },
  tablet:  { width: 768,  height: 1024, deviceScaleFactor: 2 },
  desktop: { width: 1440, height: 900,  deviceScaleFactor: 2 },
};
const viewportKey = label && Object.keys(VIEWPORTS).find(k => label.startsWith(k));
const viewport = VIEWPORTS[viewportKey] || VIEWPORTS.desktop;

const screenshotsDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Auto-increment screenshot number
const existing = fs.readdirSync(screenshotsDir)
  .map(f => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map(m => parseInt(m[1], 10));
const nextNum = existing.length > 0 ? Math.max(...existing) + 1 : 1;

const filename = label
  ? `screenshot-${nextNum}-${label}.png`
  : `screenshot-${nextNum}.png`;
const filepath = path.join(screenshotsDir, filename);

console.log(`\n  Taking screenshot of ${url}...`);

const browser = await puppeteer.launch({
  headless: true,
});

try {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  console.log(`  Viewport: ${viewport.width}×${viewport.height}`);

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to fully load before capturing
  await page.evaluate(() => document.fonts.ready);

  await page.screenshot({
    path: filepath,
    fullPage: true,
  });

  console.log(`  Saved: ${filepath}\n`);
} catch (error) {
  console.error('  Screenshot failed:', error.message);
  process.exit(1);
} finally {
  await browser.close();
}
