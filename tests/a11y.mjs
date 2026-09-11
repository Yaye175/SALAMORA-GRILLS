/**
 * Accessibility regression check — axe-core, WCAG 2.1 A + AA.
 *
 * Guards the contrast work in assets/css/styles.css. The brand orange
 * #FF5722 is 3.16:1 against white, below the AA minimum of 4.5:1, so small
 * white text sits on --ember-fill (#C93D12, 5.05:1) instead. That split is
 * easy to undo by accident — someone "restores the brand orange" on a button
 * and the site silently fails AA again. This check makes that go red.
 *
 * Runs the site over real HTTP (not file://, which blocks font loading in
 * Chromium) against a throwaway static server, at two viewports and in a few
 * interactive states that a load-time-only scan would miss.
 *
 *   npm run test:a11y
 *   CHROMIUM_PATH=/path/to/chrome npm run test:a11y   # use an existing browser
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, normalize, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createRequire } from 'node:module';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const AXE = createRequire(import.meta.url).resolve('axe-core/axe.min.js');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

function serve() {
  const server = createServer(async (req, res) => {
    // Strip the query/hash, then normalise so no request can escape ROOT.
    const rel = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
    const file = join(ROOT, rel === '/' || rel === '\\' ? 'index.html' : rel);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)));
}

/**
 * Each scenario is a state a visitor can actually be in. Load-time-only
 * scanning misses the mobile drawer and the builder's selected state.
 */
const SCENARIOS = [
  {
    name: 'mobile · initial load',
    viewport: { width: 390, height: 844 },
  },
  {
    name: 'mobile · nav drawer open',
    viewport: { width: 390, height: 844 },
    async setup(page) {
      await page.click('#burger');
      await page.waitForTimeout(400);
    },
  },
  {
    name: 'mobile · seafood tab',
    viewport: { width: 390, height: 844 },
    async setup(page) {
      await page.click('.tab[data-cat="seafood"]');
      await page.waitForTimeout(250);
    },
  },
  {
    name: 'desktop · initial load',
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'desktop · builder with selections',
    viewport: { width: 1440, height: 900 },
    async setup(page) {
      await page.locator('#optProtein .opt').nth(2).click();
      await page.locator('#optSides .opt').nth(0).click();
      await page.locator('#optSides .opt').nth(2).click();
      await page.waitForTimeout(250);
    },
  },
  {
    name: 'desktop · catering form errors',
    viewport: { width: 1440, height: 900 },
    async setup(page) {
      await page.click('#lead button[type=submit]');
      await page.waitForTimeout(250);
    },
  },
];

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const server = await serve();
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
});

let failed = 0;

for (const s of SCENARIOS) {
  const page = await browser.newPage({ viewport: s.viewport });
  await page.goto(`${origin}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  if (s.setup) await s.setup(page);

  await page.addScriptTag({ path: AXE });
  const { violations } = await page.evaluate(
    async (tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags } }),
    TAGS,
  );

  if (violations.length === 0) {
    console.log(`  PASS  ${s.name}`);
  } else {
    failed += violations.length;
    console.log(`  FAIL  ${s.name}`);
    for (const v of violations) {
      console.log(`          [${v.impact}] ${v.id} — ${v.help}  (${v.nodes.length} node(s))`);
      console.log(`          ${v.helpUrl}`);
      for (const node of v.nodes.slice(0, 5)) {
        console.log(`            ${node.target.join(' ')}`);
        console.log(`              ${node.failureSummary.replace(/\s*\n\s*/g, ' ')}`);
      }
    }
  }
  await page.close();
}

await browser.close();
server.close();

console.log();
if (failed) {
  console.error(`axe-core: ${failed} violation type(s) across ${SCENARIOS.length} scenarios. WCAG 2.1 AA not met.`);
  process.exit(1);
}
console.log(`axe-core: 0 violations across ${SCENARIOS.length} scenarios (WCAG 2.1 AA).`);
