import { expect, test } from '@playwright/test'

test('Projects hero matches the reference composition with full-colour project cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/projects')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Engineering Excellence. Delivering Innovation.')
  await expect(page.locator('.projects-cinematic-beam, .projects-cinematic-scan')).toHaveCount(0)
  const cards = page.locator('.projects-cinematic-slide:not([aria-hidden])')
  const expected: [string, string][] = [
    ['View Project: ZIA Building Complex', '/projects/zia-building-complex'],
    ['View Project: Industrial SCADA System', '/projects/industrial-scada-system'],
    ['View Project: Data Center', '/projects/data-center-operations'],
    ['Explore Hospitals: Suez Medical Complex', '/industries/hospitals'],
    ['Explore Compounds: Park Lane', '/industries/residential'],
    ['Explore Towers: CN-05 Tower', '/industries/commercial-buildings'],
    ['Explore Water: Investors-Ext Sewage Lifting Station', '/industries/water-systems'],
  ]
  await expect(cards).toHaveCount(expected.length)
  for (const [index, [label, href]] of expected.entries()) {
    await expect(cards.nth(index)).toHaveAttribute('aria-label', label)
    await expect(cards.nth(index)).toHaveAttribute('href', href)
    await expect(cards.nth(index).locator('img')).toHaveCSS('filter', 'none')
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('Projects hero respects reduced motion and scrolls to the project gallery', async ({ page }) => {
  await page.goto('/projects')
  const slide = page.locator('.projects-cinematic-slide').first()
  await expect(slide).toHaveAttribute('style', /translate3d/)
  const initial = await slide.getAttribute('style')
  await page.waitForTimeout(350)
  expect(await slide.getAttribute('style')).toBe(initial)
  await expect(page.getByRole('button', { name: 'Pause project carousel' })).toHaveCount(0)
  for (const image of await page.locator('.projects-cinematic-slide img').all()) {
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    expect(await image.getAttribute('src')).toMatch(/^\//)
  }
  await page.getByRole('button', { name: 'Next project image' }).click()
  await expect.poll(() => slide.getAttribute('style')).not.toBe(initial)
  await page.getByRole('link', { name: 'Explore Our Projects', exact: true }).click()
  await expect(page).toHaveURL(/#project-gallery$/)
  expect(await page.locator('#project-gallery').evaluate(node => node.getBoundingClientRect().top)).toBeLessThan(150)
  await expect(page.locator('#project-gallery')).toBeInViewport()
})

test('Projects carousel moves continuously and can be paused', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/projects')
  await page.mouse.move(0, 0)
  const slide = page.locator('.projects-cinematic-slide').first()
  await expect(slide).toHaveAttribute('style', /translate3d/)
  const initial = await slide.getAttribute('style')
  await expect.poll(() => slide.getAttribute('style')).not.toBe(initial)
  await page.getByRole('region', { name: 'EMS project image carousel' }).hover()
  await page.waitForTimeout(1800)
  const hoveredX = await slide.evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)
  await expect.poll(() => slide.evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)).toBeGreaterThan(hoveredX + 5)
  await page.getByRole('button', { name: 'Pause project carousel' }).click()
  await page.waitForTimeout(2200)
  const paused = await slide.getAttribute('style')
  await page.waitForTimeout(250)
  expect(await slide.getAttribute('style')).toBe(paused)
  await page.getByRole('button', { name: 'Play project carousel' }).click()
  await expect.poll(() => slide.getAttribute('style')).not.toBe(paused)
})
