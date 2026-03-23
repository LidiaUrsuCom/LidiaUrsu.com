const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// ── Page basics ──────────────────────────────────────────────────────────────

test('has correct page title', async ({ page }) => {
  await expect(page).toHaveTitle('Lidia Ursu');
});

test('has correct lang attribute', async ({ page }) => {
  const lang = await page.locator('html').getAttribute('lang');
  expect(lang).toBe('en');
});

// ── Navigation ────────────────────────────────────────────────────────────────

test('navigation bar is visible', async ({ page }) => {
  await expect(page.locator('nav')).toBeVisible();
});

test('nav logo shows name', async ({ page }) => {
  await expect(page.locator('.nav-logo')).toHaveText('Lidia Ursu');
});

test('nav contains all section links', async ({ page }) => {
  const links = page.locator('.nav-links a');
  await expect(links).toHaveCount(4);
  await expect(links.nth(0)).toHaveText('About');
  await expect(links.nth(1)).toHaveText('Community');
  await expect(links.nth(2)).toHaveText('Values');
  await expect(links.nth(3)).toHaveText('Contact');
});

test('nav CTA "Let\'s connect" is visible', async ({ page }) => {
  await expect(page.locator('nav .nav-cta')).toHaveText("Let's connect");
});

test('nav links point to correct section anchors', async ({ page }) => {
  await expect(page.locator('.nav-links a[data-section="about"]')).toHaveAttribute('href', '#about');
  await expect(page.locator('.nav-links a[data-section="community"]')).toHaveAttribute('href', '#community');
  await expect(page.locator('.nav-links a[data-section="values"]')).toHaveAttribute('href', '#values');
  await expect(page.locator('.nav-links a[data-section="contact"]')).toHaveAttribute('href', '#contact');
});

// ── Hero section ──────────────────────────────────────────────────────────────

test('hero section is visible', async ({ page }) => {
  await expect(page.locator('section.hero')).toBeVisible();
});

test('hero displays full name', async ({ page }) => {
  const heroName = page.locator('.hero-name');
  await expect(heroName).toContainText('Lidia');
  await expect(heroName).toContainText('Ursu');
});

test('hero eyebrow shows role', async ({ page }) => {
  await expect(page.locator('.hero-eyebrow')).toContainText('Product Leader');
  await expect(page.locator('.hero-eyebrow')).toContainText('Community Builder');
});

test('hero manifesto lines are visible', async ({ page }) => {
  const manifesto = page.locator('.manifesto');
  await expect(manifesto).toContainText('I build products.');
  await expect(manifesto).toContainText('I build communities.');
  await expect(manifesto).toContainText('I build a life I chose.');
});

test('hero "Let\'s talk" CTA button is visible and links to Calendly', async ({ page }) => {
  const cta = page.locator('.hero-right .btn-primary');
  await expect(cta).toBeVisible();
  await expect(cta).toContainText("Let's talk");
  const href = await cta.getAttribute('href');
  expect(href).toContain('calendly.com');
});

test('hero city tags are visible', async ({ page }) => {
  const cities = page.locator('.city-tag');
  await expect(cities).toHaveCount(3);
});

// ── About section ─────────────────────────────────────────────────────────────

test('about section exists and has correct id', async ({ page }) => {
  await expect(page.locator('section#about')).toBeAttached();
});

test('about section heading is visible', async ({ page }) => {
  await expect(page.locator('.about-heading')).toContainText('Built from scratch');
});

test('about section tags are shown', async ({ page }) => {
  const tags = page.locator('#about .tag');
  await expect(tags).toHaveCount(4);
  await expect(tags.nth(0)).toContainText('Product Management');
  await expect(tags.nth(1)).toContainText('Community Building');
});

test('about photo has alt text', async ({ page }) => {
  const img = page.locator('#about img');
  const alt = await img.getAttribute('alt');
  expect(alt).toBeTruthy();
  expect(alt).toBe('Lidia Ursu');
});

// ── Community (LiP) section ───────────────────────────────────────────────────

test('community section exists and has correct id', async ({ page }) => {
  await expect(page.locator('section#community')).toBeAttached();
});

test('community section heading is visible', async ({ page }) => {
  await expect(page.locator('.lip-heading')).toContainText('A community I\'m proud to have built.');
});

test('"Join the community" button is visible and links to Google Form', async ({ page }) => {
  const btn = page.locator('#community .btn-outline');
  await expect(btn).toBeVisible();
  await expect(btn).toContainText('Join the community');
  const href = await btn.getAttribute('href');
  expect(href).toContain('forms.gle');
});

// ── Journey section ───────────────────────────────────────────────────────────

test('journey section is visible', async ({ page }) => {
  await expect(page.locator('section.journey')).toBeVisible();
});

test('journey section has timeline items', async ({ page }) => {
  const items = page.locator('.tl-item');
  const count = await items.count();
  expect(count).toBeGreaterThanOrEqual(5);
});

test('journey section heading is visible', async ({ page }) => {
  await expect(page.locator('.journey-heading')).toContainText('The places and choices');
});

// ── Values section ────────────────────────────────────────────────────────────

test('values section exists and has correct id', async ({ page }) => {
  await expect(page.locator('section#values')).toBeAttached();
});

test('values section shows 3 beliefs', async ({ page }) => {
  const beliefs = page.locator('.belief');
  await expect(beliefs).toHaveCount(3);
});

test('values beliefs have correct titles', async ({ page }) => {
  await expect(page.locator('.belief-title').nth(0)).toContainText('Courage to begin again');
  await expect(page.locator('.belief-title').nth(1)).toContainText('Collaboration over everything');
  await expect(page.locator('.belief-title').nth(2)).toContainText('Wholeness over balance');
});

// ── Contact / Closing CTA section ─────────────────────────────────────────────

test('contact section exists and has correct id', async ({ page }) => {
  await expect(page.locator('section#contact')).toBeAttached();
});

test('closing CTA heading is visible', async ({ page }) => {
  await expect(page.locator('.closing-heading')).toContainText("Let's build something");
});

test('closing "Let\'s connect" button is visible', async ({ page }) => {
  const btn = page.locator('#contact .btn-primary');
  await expect(btn).toBeVisible();
  await expect(btn).toContainText("Let's connect");
});

// ── Footer ────────────────────────────────────────────────────────────────────

test('footer is visible', async ({ page }) => {
  await expect(page.locator('footer')).toBeVisible();
});

test('footer shows name', async ({ page }) => {
  await expect(page.locator('.footer-name')).toHaveText('Lidia Ursu');
});

test('footer has LinkedIn link', async ({ page }) => {
  const linkedin = page.locator('footer a[title="LinkedIn"]');
  await expect(linkedin).toBeVisible();
  const href = await linkedin.getAttribute('href');
  expect(href).toContain('linkedin.com');
});

test('footer has Instagram link', async ({ page }) => {
  const instagram = page.locator('footer a[title="Instagram"]');
  await expect(instagram).toBeVisible();
  const href = await instagram.getAttribute('href');
  expect(href).toContain('instagram.com/lidiaursu');
});

test('footer has TikTok link', async ({ page }) => {
  const tiktok = page.locator('footer a[title="TikTok"]');
  await expect(tiktok).toBeVisible();
  const href = await tiktok.getAttribute('href');
  expect(href).toContain('tiktok.com');
});

// ── JavaScript: active nav highlight ─────────────────────────────────────────

test('nav link becomes active when section scrolls into view', async ({ page }) => {
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400); // allow IntersectionObserver to fire
  await expect(page.locator('.nav-links a[data-section="about"]')).toHaveClass(/active/);
});

// ── Responsive / mobile ───────────────────────────────────────────────────────

test('page renders on mobile without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const viewportWidth = await page.evaluate(() => window.innerWidth);
  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // 5px tolerance
});
