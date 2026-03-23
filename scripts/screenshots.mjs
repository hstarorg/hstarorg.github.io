import { chromium } from 'playwright';
import { readFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const productsDir = './src/content/products';
const outputDir = './public/images';
mkdirSync(outputDir, { recursive: true });

// Parse frontmatter from md files
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (m) data[m[1]] = m[2];
  }
  return data;
}

const onlyNew = process.argv.includes('--only-new');

// Collect all products with their URLs
const products = readdirSync(productsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const content = readFileSync(join(productsDir, f), 'utf-8');
    const data = parseFrontmatter(content);
    const imageName =
      data.image?.replace('/images/', '') || f.replace('.md', '.png');
    return {
      name: f.replace('.md', ''),
      url: data.demoUrl || data.repoUrl,
      output: join(outputDir, imageName),
    };
  })
  .filter((p) => p.url)
  .filter((p) => !onlyNew || !existsSync(p.output));

if (products.length === 0) {
  console.log('No screenshots to take.');
  process.exit(0);
}

console.log(`Taking ${products.length} screenshot(s)...\n`);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 2,
});

for (const product of products) {
  const page = await context.newPage();
  try {
    console.log(`📸 ${product.name} → ${product.url}`);
    await page.goto(product.url, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: product.output, type: 'png' });
    console.log(`   ✅ ${product.output}`);
  } catch (e) {
    console.log(`   ⚠️ failed: ${e.message.split('\n')[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('\nDone!');
